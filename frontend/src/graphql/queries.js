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
