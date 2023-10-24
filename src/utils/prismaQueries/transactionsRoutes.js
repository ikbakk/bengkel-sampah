import prisma from "../prismaClient";

export const newTransaction = async (data) => {
  const { userID, source, wastes, partnerID, wasteBankID } = data;
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

  const foundWastes = await prisma.waste.findMany({
    select: {
      wasteID: true,
      price: true,
    },
    where: {
      wasteID: {
        in: wastes.map((waste) => waste.wasteID),
      },
    },
  });

  const { transactionID } = await prisma.transaction.create({
    data: transactionData,
  });

  const submissionData = wastes.map((waste) => ({
    transactionID,
    wasteID: foundWastes.find((waste) => waste.wasteID === waste.wasteID)
      .wasteID,
    totalPrice:
      foundWastes.find((waste) => waste.wasteID === waste.wasteID).price *
      waste.totalWeight,
    totalWeight: waste.totalWeight,
  }));

  const newSubmissions = await prisma.waste_Submission.createMany({
    data: submissionData,
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
    const wasteSubmissions = transaction.wasteSubmission.map((submission) => ({
      wasteName: submission.waste.name,
      unit: submission.waste.unit,
      totalPrice: submission.totalPrice,
      totalWeight: submission.totalWeight,
    }));

    return {
      transactionID: transaction.transactionID,
      status: transaction.status,
      transactionDate: transaction.transactionDate,
      source: transaction.source,
      partnerID: transaction.partnerID,
      wasteBankID: transaction.wasteBankID,
      user: transaction.user,
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
