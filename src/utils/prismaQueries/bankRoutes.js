import prisma from "../prismaClient";

export const bankDetails = async (bankID) => {
  return await prisma.waste_Bank.findUnique({
    where: {
      wasteBankID: bankID,
    },
    include: {
      _count: {
        select: {
          members: true,
        },
      },
    },
  });
};

export const memberDetails = async (userID, wasteBankID) => {
  return await prisma.member.findUnique({
    where: {
      userID,
      wasteBankID,
    },
    select: {
      memberID: true,
      balance: true,
      user: {
        select: {
          userID: true,
          name: true,
          address: true,
          email: true,
          phoneNumber: true,
          passwordHash: false,
          createdAt: true,
        },
      },
    },
  });
};

export const getMemberTransactions = async (userID) => {
  const transactions = await prisma.transaction.findMany({
    where: {
      userID,
    },
    include: {
      wasteSubmission: {
        select: {
          totalPrice: true,
          totalWeight: true,
          waste: {
            select: {
              name: true,
              price: true,
              unit: true,
            },
          },
        },
      },
    },
  });

  const response = transactions.map((transaction) => {
    return {
      transactionID: transaction.transactionID,
      status: transaction.status,
      transactionDate: transaction.transactionDate,
      source: transaction.source,
      partnerID: transaction.partnerID,
      wasteBankID: transaction.wasteBankID,
      waste: transaction.wasteSubmission.map((waste) => {
        return {
          ...waste.waste,
          totalPrice: waste.totalPrice,
          totalWeight: waste.totalWeight,
        };
      }),
    };
  });

  return response;
};

export const bankMembers = async (wasteBankID) => {
  return await prisma.waste_Bank.findUnique({
    where: {
      wasteBankID,
    },
    select: {
      members: {
        include: {
          user: true,
        },
      },
    },
  });
};

export const createBankMember = async (data, wasteBankID) => {
  const {
    name,
    address = null,
    email = null,
    phoneNumber,
    passwordHash,
  } = data;

  const phoneExist = await prisma.user.findUnique({
    where: {
      phoneNumber,
    },
  });

  const bankExist = await prisma.waste_Bank.findUnique({
    where: {
      wasteBankID,
    },
  });

  if (!bankExist) throw new Error("Bank ID not found");
  if (phoneExist) throw new Error("Phone number already registered");

  const newUser = await prisma.$transaction(async (prisma) => {
    const user = await prisma.user.create({
      data: {
        name,
        address,
        email,
        phoneNumber,
        passwordHash,
      },
    });

    await prisma.member.create({
      data: {
        userID: user.userID,
        wasteBankID,
      },
    });

    return user;
  });

  return {
    newName: newUser.name,
  };
};
