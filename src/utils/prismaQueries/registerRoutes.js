import prisma from "../prismaClient";

export const getUserByPhone = async (phone) => {
  const user = await prisma.user.findUnique({
    where: {
      phoneNumber: phone,
    },
    select: {
      userID: true,
      name: true,
      phoneNumber: true,
      address: true,
      email: true,
      createdAt: true,
    },
  });

  return user;
};

export const registerCustomer = async ({ name, phone, hashedPassword }) => {
  const User = await prisma.$transaction(async () => {
    const newUser = await prisma.user.create({
      data: {
        name: name,
        phoneNumber: phone,
        passwordHash: hashedPassword,
      },
      select: {
        userID: true,
        name: true,
        phoneNumber: true,
        address: true,
        email: true,
        createdAt: true,
      },
    });

    const newCustomer = await prisma.customer.create({
      data: {
        user: {
          connect: {
            userID: newUser.userID,
          },
        },
      },
    });

    return {
      ...newUser,
      customerID: newCustomer.customerID,
      balance: newCustomer.balance,
    };
  });

  return User;
};
