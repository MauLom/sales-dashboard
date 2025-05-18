const Order = require("../../models/Order");
const Product = require("../../models/Product");

const placeOrder = async (_, { input }) => {
  const { customerId, items } = input;

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
