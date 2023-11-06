import prisma from "../prismaClient";

export const findCartByUserID = async (userID) => {
  const cart = await prisma.cart.findUnique({
    where: {
      userID,
    },
    select: {
      cartID: true,
      createdAt: true,
      cartItems: {
        select: {
          cartItemID: true,
          price: true,
          weight: true,
          waste: {
            select: {
              wasteID: true,
              name: true,
              price: true,
              unit: true,
            },
          },
        },
      },
    },
  });

  if (!cart) {
    const cart = await newCart(userID);
    return cart;
  }

  const totalPrice = cart.cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.price;
  }, 0);

  const totalWeight = cart.cartItems.reduce((acc, item) => {
    return acc + item.weight;
  }, 0);

  const response = {
    ...cart,
    totalPrice,
    totalWeight,
  };

  return response;
};

export const newCart = async (userID) => {
  const newCart = await prisma.cart.create({
    data: {
      userID,
    },
    select: {
      cartID: true,
      createdAt: true,
      cartItems: {
        select: {
          cartItemID: true,
          price: true,
          weight: true,
          waste: {
            select: {
              wasteID: true,
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
    ...newCart,
    totalPrice: 0,
    totalWeight: 0,
  };

  return response;
};

export const updateCartItemWeight = async (cartItemID, newWeight) => {
  const { waste } = await prisma.cart_Item.findUnique({
    where: {
      cartItemID,
    },
    select: {
      waste: {
        select: {
          price: true,
        },
      },
    },
  });

  if (!waste.price) throw new Error("Price not found");

  const updatedCartItem = await prisma.cart_Item.update({
    where: {
      cartItemID,
    },
    data: {
      weight: newWeight,
      price: waste.price * newWeight,
    },
  });

  return updatedCartItem;
};

export const newCartItem = async (cartID, wasteID, weight) => {
  const { price } = await prisma.waste.findUnique({
    where: {
      wasteID,
    },
  });

  const newCartItem = await prisma.cart_Item.create({
    data: {
      cartID,
      wasteID: wasteID,
      price: price * weight,
      weight: weight,
    },
    select: {
      cartItemID: true,
      price: true,
      weight: true,
      waste: {
        select: {
          wasteID: true,
          name: true,
          price: true,
          unit: true,
        },
      },
    },
  });

  return newCartItem;
};

export const deleteCartItems = async (cartID, wasteIDs) => {
  await prisma.cart_Item.deleteMany({
    where: {
      cartID,
      wasteID: {
        in: wasteIDs,
      },
    },
  });

  return true;
};

export const findCart = async (cartID) => {
  const cart = await prisma.cart.findUnique({
    where: {
      cartID: cartID,
    },
  });

  return cart;
};
