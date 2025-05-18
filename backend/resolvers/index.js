const getCustomerSpending = require("./queries/getCustomerSpending");
const getTopSellingProducts = require("./queries/getTopSellingProducts");

module.exports = {
  Query: {
    getCustomerSpending,
    getTopSellingProducts,
    getSalesAnalytics: () => ({
      totalRevenue: 0,
      completedOrders: 0,
      revenuePerCategory: []
    })
  }
};

