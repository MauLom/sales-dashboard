import { gql } from "@apollo/client";

export const GET_CUSTOMER_SPENDING = gql`
  query GetCustomerSpending($customerId: ID!) {
    getCustomerSpending(customerId: $customerId) {
      totalSpent
      averageOrderValue
      lastOrderDate
    }
  }
`;

export const GET_TOP_PRODUCTS = gql`
  query GetTopSellingProducts($limit: Int!) {
    getTopSellingProducts(limit: $limit) {
      name
      quantitySold
      price
    }
  }
`;

export const GET_SALES_ANALYTICS = gql`
  query GetSalesAnalytics($startDate: String!, $endDate: String!) {
    getSalesAnalytics(startDate: $startDate, endDate: $endDate) {
      totalRevenue
      completedOrders
      revenuePerCategory {
        category
        revenue
      }
    }
  }
`;

export const GET_CUSTOMER_ORDERS = gql`
  query GetCustomerOrders($customerId: ID!, $page: Int, $limit: Int) {
    getCustomerOrders(customerId: $customerId, page: $page, limit: $limit) {
      _id
      totalAmount
      status
      orderDate
      items {
        product {
          name
        }
        quantity
      }
    }
  }
`;

export const GET_ALL_CUSTOMERS = gql`
  query GetAllCustomers {
    getAllCustomers {
      _id
      name
    }
  }
`;


