const placeOrder = require("./mutation/placerOrder");
const getCustomerOrders = require("./queries/getCustomerOrder");
const getCustomerSpending = require("./queries/getCustomerSpending");
const getSalesAnalytics = require("./queries/getSalesAnalytics");
const getTopSellingProducts = require("./queries/getTopSellingProducts");

module.exports = {
  Query: {
    getCustomerSpending,
    getTopSellingProducts,
    getSalesAnalytics,
    getCustomerOrders
  },
  Mutation: {
    placeOrder
  }
};

