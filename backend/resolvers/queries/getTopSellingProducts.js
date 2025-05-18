const Order = require("../../models/Order");
const mongoose = require("mongoose");

const getTopSellingProducts = async (_, { limit }) => {
  const results = await Order.aggregate([
    { $match: { status: "completed" } },
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.product",
        quantitySold: { $sum: "$items.quantity" }
      }
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product"
      }
    },
    { $unwind: "$product" },
    {
      $project: {
        name: "$product.name",
        price: "$product.price",
        quantitySold: 1
      }
    },
    { $sort: { quantitySold: -1 } },
    { $limit: limit }
  ]);

  return results;
};

module.exports = getTopSellingProducts;
