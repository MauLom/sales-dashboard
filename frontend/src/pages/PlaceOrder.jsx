import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  Box, Heading, Input, Button, VStack, Alert, AlertIcon, Textarea
} from "@chakra-ui/react";
import { PLACE_ORDER } from "../graphql/mutations";

export default function PlaceOrder() {
  const [customerId, setCustomerId] = useState("");
  const [productsInput, setProductsInput] = useState("[{\"productId\":\"...\",\"quantity\":1}]");
  const [placeOrder, { loading, error, data }] = useMutation(PLACE_ORDER);

  const handlePlaceOrder = () => {
    try {
      const items = JSON.parse(productsInput);
      placeOrder({ variables: { input: { customerId, items } } });
    } catch {
      setJsonError(true);
    }
  };

  return (
    <Box maxW="xl" mx="auto" mt={10} p={6}>
      <Heading size="md" mb={4}>Place New Order</Heading>
      <VStack spacing={4} align="stretch">
        <Input placeholder="Customer ID" value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
        <Textarea
          placeholder='[{"productId":"...","quantity":1}]'
          value={productsInput}
          onChange={(e) => setProductsInput(e.target.value)}
          rows={4}
        />
        <Button colorScheme="green" onClick={handlePlaceOrder} isLoading={loading}>Submit Order</Button>

        {error && <Alert status="error"><AlertIcon />{error.message}</Alert>}
        {data && <Alert status="success"><AlertIcon />Order placed successfully!</Alert>}
      </VStack>
    </Box>
  );
}