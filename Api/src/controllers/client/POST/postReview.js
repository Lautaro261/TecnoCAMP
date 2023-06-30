const { Review, Product, User } = require("../../../db");

const postReview = async (rating, comment, userSub, productId) => {
  const product = await Product.findByPk(productId);
  if (!product) {
    return { message: "No se encuentra el producto" };
  }

  const user = await User.findOne({ where: { sub: userSub } });
  if (!user) {
    return { message: "El usuario no existe" };
  }

  let review = await Review.findOne({
    where: {
      productId,
      userSub,
    },
  });

  if (review) {
    // El usuario ya ha dejado una reseña para este producto, se actualiza
    await Review.update(
      { rating, comment },
      { where: { id: review.id } }
    );
  } else {
    // El usuario no ha dejado una reseña para este producto, se crea una nueva
    review = await Review.create({
      rating,
      comment,
      userSub,
      productId,
    });
  }

  return review;
};

module.exports = postReview;
