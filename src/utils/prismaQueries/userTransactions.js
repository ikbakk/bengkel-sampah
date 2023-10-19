export const getUserTransactionsByStatus = (userID, status) => {
  return prisma.transaction.findMany({
    where: {
      userID,
      status,
    },
    include: {
      waste_Submission: {
        include: {
          waste: true,
        },
      },
    },
  });
};

export const getUserTransactions = async (userID) => {
  const transactions = await prisma.transaction.findMany({
    where: {
      userID,
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
