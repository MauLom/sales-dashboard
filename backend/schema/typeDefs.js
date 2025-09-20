const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    name: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input RegisterInput {
    email: String!
    password: String!
    name: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

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

  type Query {
    me: User
    getCustomerSpending(customerId: ID!): CustomerSpending
    getTopSellingProducts(limit: Int!): [TopProduct]
    getSalesAnalytics(startDate: String!, endDate: String!): SalesAnalytics
    getCustomerOrders(customerId: ID!, page: Int, limit: Int): [Order]
    getAllCustomers: [Customer!]!
  }

  type Mutation {
    register(input: RegisterInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    placeOrder(input: PlaceOrderInput!): Order
  }

`;

module.exports = typeDefs;
