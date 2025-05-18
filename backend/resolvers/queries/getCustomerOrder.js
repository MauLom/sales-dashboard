const Order = require("../../models/Order");
const Product = require("../../models/Product");

const getCustomerOrders = async (_, { customerId, page = 1, limit = 5 }) => {
  const skip = (page - 1) * limit;

  const orders = await Order.find({ customer: customerId })
    .sort({ orderDate: -1 })
    .skip(skip)
    .limit(limit)
    .populate("items.product");

  return orders;
};

module.exports = getCustomerOrders;
