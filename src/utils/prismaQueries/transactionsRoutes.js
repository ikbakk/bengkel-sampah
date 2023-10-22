import prisma from "../prismaClient";

export const newTransaction = async (data) => {
  const { userID, source, partnerID, wasteBankID, wasteSubmissions } = data;

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

  const wasteItems = await prisma.waste.findMany({
    where: {
      name: {
        in: wasteSubmissions.map((submission) => submission.wasteName),
      },
    },
  });

  const { transactionID } = await prisma.transaction.create({
    data: transactionData,
  });

  const newSubmissions = await prisma.waste_Submission.createMany({
    data: wasteSubmissions.map((submission) => ({
      transactionID,
      wasteID: wasteItems.find((waste) => waste.name === submission.wasteName)
        .wasteID,
      totalPrice:
        wasteItems.find((waste) => waste.name === submission.wasteName).price *
        submission.totalWeight,
      totalWeight: submission.totalWeight,
    })),
  });

  return newSubmissions;
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

export const getTransactions = async (filterBy, filterValue) => {
  const baseQuery = {
    include: {
      wasteSubmission: {
        select: {
          totalPrice: true,
          totalWeight: true,
          waste: {
            select: {
              name: true,
              unit: true,
            },
          },
        },
      },
      user: {
        select: {
          name: true,
          address: true,
          phoneNumber: true,
        },
      },
    },
  };

  const filter = filterBy && filterValue ? { [filterBy]: filterValue } : false;
  const query = filter ? { where: filter, ...baseQuery } : baseQuery;
  const transactions = await prisma.transaction.findMany(query);

  const response = transactions.map((transaction) => {
    const { name, address, phoneNumber } = transaction.user;
    const wasteSubmissions = transaction.wasteSubmission.map((submission) => ({
      wasteName: submission.waste.name,
      unit: submission.waste.unit,
      totalPrice: submission.totalPrice,
      totalWeight: submission.totalWeight,
    }));

    return {
      name,
      address,
      phoneNumber,
      transactionID: transaction.transactionID,
      transactionDate: transaction.transactionDate,
      source: transaction.source,
      partnerID: transaction.partnerID,
      wasteBankID: transaction.wasteBankID,
      status: transaction.status,
      wasteSubmissions,
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
