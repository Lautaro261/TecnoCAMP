const { Review, Product, User } = require("../../../db");

const postReview = async (rating, comment, userSub, productId) => {
  //Verificar si el producto existe
  const product = await Product.findByPk(productId);
  if (!product) {
    return { message: "No se encuentra el producto" };
  }

  //Verificar si el usuario existe
  const user = await User.findOne({
    where: { sub: userSub },
  });
  if (!user) {
    return { message: "El usuario no existe" };
  }

  const productReview = await Review.findOne({
    where: {
      productId: productId,
    }
  });

  if (productReview) {
    productReview.rating = rating;
    productReview.comment = comment;
    productReview.userSub = userSub;

    const result = await productReview.save();

    return result;
  } else {
    const review = await Review.create({
      rating,
      comment,
      userSub,
      productId,
    });
    return review;
  }
};

module.exports = postReview;
