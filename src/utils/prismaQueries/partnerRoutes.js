import prisma from "../prismaClient";
import { NotFoundError } from "@/utils/errors";

export const getPartners = async () => {
  const partners = await prisma.user.findMany({
    select: {
      userID: true,
      phoneNumber: true,
      name: true,
      address: true,
      role: true,
      email: true,
    },
    where: {
      role: "PARTNER",
    },
  });

  return partners;
};

export const getPartner = async (partnerID) => {
  const partner = await prisma.user.findUnique({
    select: {
      userID: true,
      phoneNumber: true,
      name: true,
      address: true,
      role: true,
      email: true,
      createdAt: true,
    },
    where: {
      userID: partnerID,
    },
  });

  if (!partner) throw new NotFoundError("Partner not found");

  return partner;
};

export const createPartner = async ({
  name,
  phoneNumber,
  address = null,
  hashedPassword,
}) => {
  const newUser = await prisma.user.create({
    data: {
      name: name,
      phoneNumber: phoneNumber,
      address: address,
      passwordHash: hashedPassword,
      role: "PARTNER",
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

  return newUser;
};

export const updatePartner = async (partnerID, data) => {
  const { name, phoneNumber, address } = data;

  const newData = await prisma.user.update({
    where: {
      userID: partnerID,
    },
    data: {
      name: name,
      phoneNumber: phoneNumber,
      address: address,
    },
    select: {
      userID: true,
      phoneNumber: true,
      name: true,
      address: true,
      role: true,
      email: true,
    },
  });

  return newData;
};

export const deletePartner = async (partnerID) => {
  await prisma.user.delete({
    where: {
      userID: partnerID,
    },
  });

  return true;
};

export const deleteAllPartner = async (partnersID) => {
  await prisma.user.deleteMany({
    where: {
      userID: {
        in: partnersID,
      },
    },
  });

  return true;
};
