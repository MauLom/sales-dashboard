const mongoose = require("mongoose");
const Order = require("../../models/Order");

const getCustomerSpending = async (_, { customerId }) => {
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
