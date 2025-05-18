const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type CustomerSpending {
    totalSpent: Float
    averageOrderValue: Float
    lastOrderDate: String
  }

  type TopProduct {
    name: String
    quantitySold: Int
    price: Float
  }

  type CategoryRevenue {
    category: String
    revenue: Float
  }

  type SalesAnalytics {
    totalRevenue: Float
    completedOrders: Int
    revenuePerCategory: [CategoryRevenue]
  }

  type Product {
    _id: ID
    name: String
    price: Float
    category: String
  }

  type Customer {
    _id: ID
    name: String
    email: String
  }

  type OrderItem {
    product: Product
    quantity: Int
  }

  type Order {
    _id: ID
    customer: Customer
    items: [OrderItem]
    totalAmount: Float
    status: String
    orderDate: String
  }

  input OrderItemInput {
    productId: ID!
    quantity: Int!
  }

  input PlaceOrderInput {
    customerId: ID!
    items: [OrderItemInput!]!
  }

  type Customer {
    _id: ID!
    name: String
  }

  type Query {
    getCustomerSpending(customerId: ID!): CustomerSpending
    getTopSellingProducts(limit: Int!): [TopProduct]
    getSalesAnalytics(startDate: String!, endDate: String!): SalesAnalytics
    getCustomerOrders(customerId: ID!, page: Int, limit: Int): [Order]
    getAllCustomers: [Customer!]!
  }

  type Mutation {
    placeOrder(input: PlaceOrderInput!): Order
  }

`;

module.exports = typeDefs;
