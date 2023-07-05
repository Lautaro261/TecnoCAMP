const { Review, Product, User } = require("../../../db");

const getAllReview = async () => {
  const allReview = await Review.findAll({
    order: [["rating", "DESC"]],
    include: [{
      model: User,
      attributes: ["name"],
    },{
      model: Product,
    }]
  });

  if (allReview.length === 0) {
    return { message: "No hay reviews registradas" };
  }

  return allReview;
};

module.exports = getAllReview;
