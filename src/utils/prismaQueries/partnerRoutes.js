import prisma from "../prismaClient";
import { NotFoundError } from "@/utils/errors";

export const getPartners = async () => {
  const partners = await prisma.partner.findMany({});

  return partners;
};

export const getPartner = async (partnerID) => {
  const partner = await prisma.partner.findUnique({
    where: {
      partnerID: partnerID,
    },
  });

  if (!partner) throw new NotFoundError("Partner not found");

  return partner;
};

export const createPartner = async ({ name, phoneNumber, address = null }) => {
  const newPartner = await prisma.partner.create({
    data: {
      name,
      phoneNumber,
      address,
    },
  });

  return newPartner;
};

export const updatePartner = async (partnerID, data) => {
  const { name, phoneNumber, address } = data;

  const newData = await prisma.partner.update({
    where: {
      partnerID: partnerID,
    },
    data: {
      name: name,
      phoneNumber: phoneNumber,
      address: address,
    },
  });

  return newData;
};

export const deletePartner = async (partnerID) => {
  await prisma.partner.delete({
    where: {
      partnerID: partnerID,
    },
  });

  return true;
};
