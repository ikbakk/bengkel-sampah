import prisma from "@/utils/prismaClient";
import { NotFoundError } from "@/utils/errors";

export const getCustomers = async () => {
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

  const response = customers.map((customer) => ({
    customerID: customer.customerID,
    ...customer.user,
    balance: customer.balance,
  }));

  return response;
};

export const getCustomer = async (customerID) => {
  const customer = await prisma.customer.findUnique({
    where: {
      customerID,
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

  if (!customer) throw new NotFoundError("Customer not found");

  return {
    customerID: customer.customerID,
    userID: customer.userID,
    balance: customer.balance,
    name: customer.user.name,
    address: customer.user.address,
    phoneNumber: customer.user.phoneNumber,
    email: customer.user.email,
    role: customer.user.role,
  };
};

export const updateCustomer = async (
  userID,
  { name, address, phoneNumber, email },
) => {
  const newUser = await prisma.user.update({
    where: {
      userID,
    },
    select: {
      userID: true,
      name: true,
      address: true,
      phoneNumber: true,
      email: true,
    },
    data: {
      name,
      address,
      phoneNumber,
      email,
    },
  });

  return newUser;
};

export const deleteCustomer = async (userID) => {
  await prisma.user.delete({
    where: {
      userID,
    },
  });
};
