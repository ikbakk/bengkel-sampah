import prisma from "../prismaClient";

export const newTransaction = async (data) => {
  const { userID, source, waste, partnerID, wasteBankID } = data;
  let transactionData = {
    userID,
    source,
  };

  if (source === "PARTNER" && partnerID) {
    transactionData = {
      ...transactionData,
      partnerID,
    };
  }

  if (source === "WASTE_BANK" && wasteBankID) {
    transactionData = {
      ...transactionData,
      wasteBankID,
    };
  }

  const wastePrice = await prisma.waste.findMany({
    select: {
      wasteID: true,
      price: true,
    },
    where: {
      wasteID: {
        in: waste.map((waste) => waste.wasteID),
      },
    },
  });

  const wastePriceObject = wastePrice.reduce((acc, waste) => {
    return {
      ...acc,
      [waste.wasteID]: {
        price: waste.price,
      },
    };
  }, {});

  const transactions = await prisma.$transaction(async (prisma) => {
    const transaction = await prisma.transaction.create({
      data: {
        ...transactionData,
      },
    });

    const wasteSubmission = waste.map((waste) => ({
      transactionID: transaction.transactionID,
      wasteID: waste.wasteID,
      totalWeight: waste.total,
      totalPrice: waste.total * wastePriceObject[waste.wasteID].price,
    }));
    console.log(wasteSubmission);

    await prisma.waste_Submission.createMany({
      data: wasteSubmission,
    });

    return transaction;
  });

  return transactions;
};

export const updateTransactionStatus = async (transactionID, newStatus) => {
  const updatedTransaction = await prisma.transaction.update({
    where: {
      transactionID,
    },
    data: {
      status: newStatus,
    },
  });
  return updatedTransaction;
};

export const getTransactions = async (status) => {
  let query = {
    include: {
      user: {
        select: {
          name: true,
          address: true,
          phoneNumber: true,
        },
      },
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
  };

  if (status) {
    query = {
      ...query,
      where: {
        status,
      },
    };
  }

  const transactions = await prisma.transaction.findMany(query);
  const response = transactions.map((transaction) => {
    return {
      transactionID: transaction.transactionID,
      status: transaction.status,
      transactionDate: transaction.transactionDate,
      user: {
        userID: transaction.userID,
        name: transaction.user.name,
        address: transaction.user.address,
        phoneNumber: transaction.user.phoneNumber,
      },
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

export const getTransaction = async (transactionID) => {
  const transaction = await prisma.transaction.findUnique({
    where: {
      transactionID,
    },
    include: {
      user: {
        select: {
          name: true,
          address: true,
          phoneNumber: true,
        },
      },
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

  const response = {
    transactionID: transaction.transactionID,
    status: transaction.status,
    transactionDate: transaction.transactionDate,
    user: {
      userID: transaction.userID,
      name: transaction.user.name,
      address: transaction.user.address,
      phoneNumber: transaction.user.phoneNumber,
    },
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

  return response;
};
