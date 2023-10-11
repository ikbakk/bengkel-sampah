import prisma from "../prismaClient";

export const newTransaction = async (data) => {
  const { userID, source, wasteName, partnerID, wasteBankID, totalWeight } =
    data;
  let transactionData = {
    userID,
    source,
  };

  if (source === "PARTNER" && partnerID) {
    transactionData = {
      ...transactionData,
      partnerID,
    };
  } else {
    transactionData = {
      ...transactionData,
      wasteBankID,
    };
  }

  const { wasteID, price } = await prisma.waste.findFirst({
    where: {
      name: wasteName,
    },
  });

  const { transactionID } = await prisma.transaction.create({
    data: transactionData,
  });

  const newSubmission = await prisma.waste_Submission.create({
    data: {
      wasteID,
      transactionID: transactionID,
      totalPrice: price * totalWeight,
      totalWeight,
    },
  });

  return newSubmission;
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
  const response = transactions.map((transaction) => ({
    name: transaction.user.name,
    address: transaction.user.address,
    phoneNumber: transaction.user.phoneNumber,
    transactionID: transaction.transactionID,
    status: transaction.status,
    transactionDate: transaction.transactionDate,
    source: transaction.source,
    partnerID: transaction.partnerID,
    wasteBankID: transaction.wasteBankID,
    totalPrice: transaction.wasteSubmission.totalPrice,
    wasteName: transaction.wasteSubmission.waste.name,
    weight: transaction.wasteSubmission.totalWeight,
    unit: transaction.wasteSubmission.waste.unit,
  }));

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
    transactionDate: transaction.transactionDate,
    name: transaction.user.name,
    address: transaction.user.address,
    phoneNumber: transaction.user.phoneNumber,
    status: transaction.status,
    source: transaction.source,
    partnerID: transaction.partnerID,
    wasteBankID: transaction.wasteBankID,
    wasteName: transaction.wasteSubmission.waste.name,
    totalPrice: transaction.wasteSubmission.totalPrice,
    weight: transaction.wasteSubmission.totalWeight,
    unit: transaction.wasteSubmission.waste.unit,
  };

  return response;
};
