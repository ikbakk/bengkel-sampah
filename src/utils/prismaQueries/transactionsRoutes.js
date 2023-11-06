import { NotFoundError } from "../errors";
import prisma from "../prismaClient";

export const newTransaction = async ({
  userID,
  source,
  wastes,
  partnerID,
  wasteBankID,
}) => {
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
        in: wastes.map((waste) => waste.wasteID),
      },
    },
  });

  const { transactionID } = await prisma.transaction.create({
    data: transactionData,
  });

  const submissionData = wastes.map((waste) => {
    const price = wastePrice.find((p) => p.wasteID === waste.wasteID);
    const totalPrice = waste.totalWeight * price.price;

    return {
      transactionID,
      wasteID: waste.wasteID,
      totalPrice,
      totalWeight: waste.totalWeight,
    };
  });

  const newSubmissions = await prisma.waste_Submission.createMany({
    data: submissionData,
  });

  return {
    totalSubmission: newSubmissions.count,
  };
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
          userID: true,
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

  if (!transaction) throw new NotFoundError("Transaction not found");

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
