const placeOrder = require("./mutation/placerOrder");
const register = require("./mutation/register");
const login = require("./mutation/login");
const getAllCustomers = require("./queries/getAllCustomers");
const getCustomerOrders = require("./queries/getCustomerOrder");
const getCustomerSpending = require("./queries/getCustomerSpending");
const getSalesAnalytics = require("./queries/getSalesAnalytics");
const getTopSellingProducts = require("./queries/getTopSellingProducts");
const me = require("./queries/me");

module.exports = {
  Query: {
    me,
    getCustomerSpending,
    getTopSellingProducts,
    getSalesAnalytics,
    getCustomerOrders,
    getAllCustomers
  },
  Mutation: {
    register,
    login,
    placeOrder
  }
};

