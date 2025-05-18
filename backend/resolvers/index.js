const getCustomerSpending = require("./queries/getCustomerSpending");
const getSalesAnalytics = require("./queries/getSalesAnalytics");
const getTopSellingProducts = require("./queries/getTopSellingProducts");

module.exports = {
  Query: {
    getCustomerSpending,
    getTopSellingProducts,
    getSalesAnalytics
  }
};

