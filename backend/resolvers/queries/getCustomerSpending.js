const mongoose = require("mongoose");
const Order = require("../../models/Order");
const Customer = require("../../models/Customer");
const { requireAuth } = require("../../middleware/auth");

const getCustomerSpending = async (_, { customerId }, context) => {
  const user = requireAuth(context.user);
  
  // Verify customer belongs to authenticated user
  const customer = await Customer.findOne({ _id: customerId, userId: user._id });
  if (!customer) {
    throw new Error("Customer not found or access denied");
  }

  const data = await Order.aggregate([
    { $match: { customer: new mongoose.Types.ObjectId(customerId), status: "completed" } },
    {
      $group: {
        _id: "$customer",
        totalSpent: { $sum: "$totalAmount" },
        averageOrderValue: { $avg: "$totalAmount" },
        lastOrderDate: { $max: "$orderDate" }
      }
    }
  ]);

  if (!data.length) {
    return {
      totalSpent: 0,
      averageOrderValue: 0,
      lastOrderDate: null
    };
  }

  const result = data[0];

  return {
    totalSpent: result.totalSpent,
    averageOrderValue: result.averageOrderValue,
    lastOrderDate: result.lastOrderDate
  };
};

module.exports = getCustomerSpending;
