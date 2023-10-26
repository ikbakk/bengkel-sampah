import prisma from "@/utils/prismaClient";

export const getDrivers = async () => {
  const drivers = await prisma.driver.findMany({
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

  return drivers;
};

export const getDriverDetail = async (driverID) => {
  const driverDetail = await prisma.driver.findUnique({
    where: {
      userID: driverID,
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

  return driverDetail;
};

export const createDriver = async (data) => {
  const { name, address, phoneNumber, passwordHash, role, email } = data;

  const newDriver = await prisma.user.create({
    data: {
      name: name,
      address: address,
      phoneNumber: phoneNumber,
      passwordHash: passwordHash,
      email: email,
      role: role,
      driver: {
        create: {},
      },
    },
  });

  return newDriver;
};

export const updateDriver = async (driverID, data) => {
  const { name, address, phoneNumber, email, driverStatus } = data;

  const driver = await prisma.user.update({
    where: {
      userID: driverID,
    },
    data: {
      name: name,
      address: address,
      phoneNumber: phoneNumber,
      email: email,
      driver: {
        update: {
          driverStatus: driverStatus,
        },
      },
    },
    include: {
      driver: true,
    },
  });

  return driver;
};

export const deleteDriver = async (driverID) => {
  const deleteDriver = await prisma.user.delete({
    where: {
      userID: driverID,
    },
  });
  
  return deleteDriver;
}