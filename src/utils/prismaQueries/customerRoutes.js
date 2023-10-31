import prisma from "@/utils/prismaClient";

export const getAllCustomer = async () => {
  const customers = await prisma.customer.findMany({
    include: {
      user: {
        select: {
          userID: true,
          name: true,
          address: true,
          phoneNumber: true,
          email: true,
          role: true,
        },
      },
    },
  });

  return customers;
};

export const getDetailCustomer = async (customerID) => {
  const customer = await prisma.customer.findUnique({
    where: {
      userID: customerID,
    },
    include: {
      user: {
        select: {
          name: true,
          address: true,
          phoneNumber: true,
          email: true,
          role: true,
        },
      },
    },
  });

  return customer;
};

export const addCustomer = async (data) => {
  const { name, address, phoneNumber, passwordHash, role, balance, email } =
    data;
  const customer = await prisma.user.create({
    data: {
      name: name,
      address: address,
      phoneNumber: phoneNumber,
      passwordHash: passwordHash,
      email: email,
      role: role,
      customer: {
        create: {
          balance: balance,
        },
      },
    },
    include: {
      customer: {
        select: {
          customerID: true,
          balance: true,
          userID: false,
        },
      },
    },
  });

  return customer;
};

export const updateCustomer = async (customerID, data) => {
  const { name, address, phoneNumber, email } = data;

  const newDataCustomer = await prisma.user.update({
    where: {
      userID: customerID,
    },
    data: {
      name: name,
      address: address,
      phoneNumber: phoneNumber,
      email: email,
    },
  });

  return newDataCustomer;
};

export const deleteCustomer = async (customerID) => {
  await prisma.user.delete({
    where: {
      userID: customerID,
    },
  });
};

export const findCustomer = async (customerID) => {
  const customer = await prisma.customer.findUnique({
    where: {
      userID: customerID,
    },
  });

  return customer;
};
