import prisma from "../prismaClient";

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
  const waste = await prisma.waste.findUnique({
    where: {
      wasteID,
    },
  });

  if (!waste) {
    throw new Error("Waste not found");
  }

  const updatedWaste = await prisma.waste.update({
    where: {
      wasteID,
    },
    data: {
      price,
    },
  });

  return updatedWaste;
};

export const deleteWaste = async (wasteID) => {
  const waste = await prisma.waste.findUnique({
    where: {
      wasteID,
    },
  });

  if (!waste) {
    throw new Error("Waste not found");
  }

  await prisma.waste.delete({
    where: {
      wasteID,
    },
  });

  return "Deleted waste with ID: " + wasteID;
};
