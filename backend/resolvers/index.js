module.exports = {
  Query: {
    getCustomerSpending: () => {
      return {
        totalSpent: 0,
        averageOrderValue: 0,
        lastOrderDate: null
      };
    },
    getTopSellingProducts: () => [],
    getSalesAnalytics: () => ({
      totalRevenue: 0,
      completedOrders: 0,
      revenuePerCategory: []
    })
  }
};
