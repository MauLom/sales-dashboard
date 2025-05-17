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
