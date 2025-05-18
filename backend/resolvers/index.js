const placeOrder = require("./mutation/placerOrder");
const getAllCustomers = require("./queries/getAllCustomers");
const getCustomerOrders = require("./queries/getCustomerOrder");
const getCustomerSpending = require("./queries/getCustomerSpending");
const getSalesAnalytics = require("./queries/getSalesAnalytics");
const getTopSellingProducts = require("./queries/getTopSellingProducts");

module.exports = {
  Query: {
    getCustomerSpending,
    getTopSellingProducts,
    getSalesAnalytics,
    getCustomerOrders,
    getAllCustomers
  },
  Mutation: {
    placeOrder
  }
};

