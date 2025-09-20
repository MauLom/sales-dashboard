const Order = require("../../models/Order");
const Product = require("../../models/Product");
const Customer = require("../../models/Customer");
const { requireAuth } = require("../../middleware/auth");

const placeOrder = async (_, { input }, context) => {
  const user = requireAuth(context.user);
  const { customerId, items } = input;

  // Verify customer belongs to authenticated user
  const customer = await Customer.findOne({ _id: customerId, userId: user._id });
  if (!customer) {
    throw new Error("Customer not found or access denied");
  }

  const productDocs = await Product.find({
    _id: { $in: items.map(item => item.productId) }
  });

  let totalAmount = 0;

  const validatedItems = items.map(item => {
    const product = productDocs.find(p => p._id.toString() === item.productId);
    if (!product) throw new Error(`Product not found: ${item.productId}`);
    totalAmount += product.price * item.quantity;
    return {
      product: product._id,
      quantity: item.quantity
    };
  });

  const newOrder = new Order({
    customer: customerId,
    items: validatedItems,
    totalAmount,
    status: "completed",
    orderDate: new Date()
  });

  await newOrder.save();

  return newOrder;
};

module.exports = placeOrder;
