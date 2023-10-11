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
        include: {
          transactions: {
            select: {
              status: true,
              transactionDate: true,
              wasteSubmission: {
                select: {
                  totalWeight: true,
                  totalPrice: true,
                  waste: true,
                },
              },
            },
          },
        },
      },
    },
  });
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
  const { name, address, email, phoneNumber, passwordHash } = data;

  const { userID, name: newName } = await prisma.user.create({
    data: {
      name,
      address,
      email,
      phoneNumber,
      passwordHash,
      role: "MEMBER",
    },
  });

  await prisma.member.create({
    data: {
      balance: 0,
      wasteBankID,
      userID: userID,
    },
  });

  return {
    name: newName,
    userID,
  };
};
