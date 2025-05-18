import { gql } from "@apollo/client";
export const PLACE_ORDER = gql`
  mutation PlaceOrder($input: PlaceOrderInput!) {
    placeOrder(input: $input) {
      _id
      totalAmount
      status
      orderDate
      items {
        product {
          name
          price
        }
        quantity
      }
    }
  }
`;