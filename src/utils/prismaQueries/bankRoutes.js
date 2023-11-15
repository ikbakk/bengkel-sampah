import prisma from "../prismaClient";
import { BadRequestError, NotFoundError } from "@/utils/errors";

export const getBankList = async (bankID) => {
  const banks = await prisma.waste_Bank.findMany({
    include: {
      _count: {
        select: {
          members: true,
        },
      },
    },
  });
  return banks.map((bank) => {
    return {
      wasteBankID: bank.wasteBankID,
      name: bank.name,
      address: bank.address,
      members: bank._count.members,
    };
  });
};

export const bankDetails = async (bankID) => {
  const bank = await prisma.waste_Bank.findUnique({
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

  if (!bank) throw new NotFoundError("Waste bank not found");

  const response = {
    wasteBankID: bank.wasteBankID,
    name: bank.name,
    address: bank.address,
    members: bank._count.members,
  };

  return response;
};

export const createBank = async (name, address) => {
  const newBank = await prisma.waste_Bank.create({
    data: {
      name,
      address,
    },
  });

  return newBank;
};

export const memberDetails = async (memberID, wasteBankID) => {
  const member = await prisma.member.findUnique({
    where: {
      memberID,
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

  if (!member) throw new NotFoundError("Member not found");

  const response = {
    memberID: member.memberID,
    userID: member.user.userID,
    name: member.user.name,
    address: member.user.address,
    email: member.user.email,
    phoneNumber: member.user.phoneNumber,
    balance: member.balance,
    createdAt: member.user.createdAt,
  };

  return response;
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
  const members = await prisma.waste_Bank.findUnique({
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

  if (!members) throw new NotFoundError("Bank not found");

  const response = members.members.map((member) => {
    return {
      userID: member.userID,
      memberID: member.memberID,
      name: member.user.name,
      address: member.user.address,
      email: member.user.email,
      phoneNumber: member.user.phoneNumber,
      balance: member.balance,
    };
  });

  return response;
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

  if (!bankExist) throw new NotFoundError("Bank not found");
  if (phoneExist) throw new BadRequestError("Phone number already registered");

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
    userID: newUser.userID,
    phoneNumber: newUser.phoneNumber,
    name: newUser.name,
    address: newUser.address,
    email: newUser.email,
  };
};

export const deleteBank = async (wasteBankID) => {
  const bank = await prisma.waste_Bank.findUnique({
    where: {
      wasteBankID,
    },
  });

  if (!bank) throw new NotFoundError("Bank not found");

  const deletedBank = await prisma.waste_Bank.delete({
    where: {
      wasteBankID,
    },
  });

  return deletedBank;
};
