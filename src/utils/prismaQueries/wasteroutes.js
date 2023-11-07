import prisma from "../prismaClient";
import { NotFoundError } from "@/utils/errors";

export const getWastes = async () => {
  const wastes = await prisma.waste.findMany();
  return wastes;
};

export const getWaste = async (wasteID) => {
  const waste = await prisma.waste.findUnique({
    where: {
      wasteID,
    },
  });

  if (!waste) throw new NotFoundError("Waste not found");

  return waste;
};

export const newWaste = async (data) => {
  const { name, price, wasteType, unit } = data;
  const newWaste = await prisma.waste.create({
    data: {
      name,
      price,
      wasteType,
      unit,
    },
  });

  return newWaste;
};

export const updateWastePrice = async (wasteID, price) => {
  const updatedWaste = await prisma.waste.update({
    where: {
      wasteID,
    },
    data: {
      price: price,
    },
  });

  return updatedWaste;
};

export const deleteWaste = async (wasteID) => {
  await prisma.waste.delete({
    where: {
      wasteID,
    },
  });
};
