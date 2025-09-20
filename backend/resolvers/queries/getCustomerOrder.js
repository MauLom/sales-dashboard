const Order = require("../../models/Order");
const Customer = require("../../models/Customer");
const Product = require("../../models/Product");
const { requireAuth } = require("../../middleware/auth");

const getCustomerOrders = async (_, { customerId, page = 1, limit = 5 }, context) => {
  const user = requireAuth(context.user);
  
  // Verify customer belongs to authenticated user
  const customer = await Customer.findOne({ _id: customerId, userId: user._id });
  if (!customer) {
    throw new Error("Customer not found or access denied");
  }

  const skip = (page - 1) * limit;

  const orders = await Order.find({ customer: customerId })
    .sort({ orderDate: -1 })
    .skip(skip)
    .limit(limit)
    .populate("items.product");

  return orders;
};

module.exports = getCustomerOrders;
