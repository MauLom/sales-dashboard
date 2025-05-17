const getCustomerSpending = require("./queries/getCustomerSpending");

module.exports = {
  Query: {
    getCustomerSpending,
    getTopSellingProducts: () => [],
    getSalesAnalytics: () => ({
      totalRevenue: 0,
      completedOrders: 0,
      revenuePerCategory: []
    })
  }
};

