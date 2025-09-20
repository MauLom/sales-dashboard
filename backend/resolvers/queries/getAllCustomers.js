const Customer = require("../../models/Customer");
const { requireAuth } = require("../../middleware/auth");

module.exports = async (_, args, context) => {
  const user = requireAuth(context.user);
  return await Customer.find({ userId: user._id }, "_id name").sort({ name: 1 });
};