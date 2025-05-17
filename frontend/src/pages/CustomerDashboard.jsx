import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  Box,
  Input,
  Button,
  Text,
  VStack,
  Heading,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from "@chakra-ui/react";
import { GET_CUSTOMER_SPENDING } from "../graphql/queries";

export default function CustomerDashboard() {
  const [customerId, setCustomerId] = useState("");
  const [getSpending, { loading, error, data }] = useLazyQuery(GET_CUSTOMER_SPENDING);

  const handleSearch = () => {
    if (customerId.trim() !== "") {
      getSpending({ variables: { customerId } });
    }
  };

  return (
    <Box maxW="lg" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="lg">
      <Heading size="md" mb={4}>Buscar Cliente</Heading>
      <VStack spacing={4} align="stretch">
        <Input
          placeholder="ID del Cliente"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handleSearch}>Consultar</Button>

        {loading && <Spinner />}

        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Error:</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}

        {data?.getCustomerSpending && (
          <Box mt={4} p={4} borderWidth={1} borderRadius="md" bg="gray.50">
            <Text><strong>Total Gastado:</strong> ${data.getCustomerSpending.totalSpent.toFixed(2)}</Text>
            <Text><strong>Promedio por Orden:</strong> ${data.getCustomerSpending.averageOrderValue.toFixed(2)}</Text>
            <Text><strong>Última Orden:</strong> {new Date(data.getCustomerSpending.lastOrderDate).toLocaleDateString()}</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
}
