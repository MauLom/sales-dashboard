const Customer = require("../../models/Customer");

module.exports = async () => {
  return await Customer.find({}, "_id name").sort({ name: 1 });
};