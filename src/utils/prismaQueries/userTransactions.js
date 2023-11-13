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
      partner: {
        select: {
          name: true,
          address: true,
          phoneNumber: true,
        },
      },
      wasteBank: {
        select: {
          name: true,
          address: true,
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
    let totalPrice = 0;
    const wastes = transaction.wasteSubmission.map((waste) => {
      totalPrice += waste.totalPrice;
      return {
        name: waste.waste.name,
        formula:
          waste.totalWeight +
          " " +
          waste.waste.unit +
          " x " +
          waste.waste.price,
        totalPrice: waste.totalPrice,
      };
    });
    const response = {
      transactionID: transaction.transactionID,
      transactionDate: transaction.transactionDate,
      status: transaction.status,
      source: transaction.source,
      address: transaction.address,
      user: {
        userID: transaction.userID,
        name: transaction.user.name,
        address: transaction.user.address,
        phoneNumber: transaction.user.phoneNumber,
      },
      partner: {
        partnerID: transaction.partnerID,
        name: transaction.partner.name,
        address: transaction.partner.address,
        phoneNumber: transaction.partner.phoneNumber,
      },
      wasteBankID: transaction.wasteBankID,
      wastes,
      totalPrice,
    };

    if (transaction.source == "PARTNER") delete response.wasteBankID;
    if (transaction.source == "WASTE_BANK") delete response.partner;
    if (transaction.source == "DIRECT")
      response.partner = {
        name: "Bengkel Sampah",
      };

    return response;
  });

  return response;
};
