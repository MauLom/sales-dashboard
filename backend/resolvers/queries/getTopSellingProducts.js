const Order = require("../../models/Order");
const Customer = require("../../models/Customer");
const { requireAuth } = require("../../middleware/auth");

const getTopSellingProducts = async (_, { limit }, context) => {
  const user = requireAuth(context.user);
  
  // Get all customer IDs for the authenticated user
  const userCustomers = await Customer.find({ userId: user._id }, '_id');
  const customerIds = userCustomers.map(c => c._id);

  const results = await Order.aggregate([
    { $match: { customer: { $in: customerIds }, status: "completed" } },
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
