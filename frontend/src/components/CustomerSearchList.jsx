import { useQuery } from "@apollo/client";
import { Box, Text, VStack, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { GET_ALL_CUSTOMERS } from "../graphql/queries";

export default function CustomerSearchList({ onSelect }) {
  const { loading, error, data } = useQuery(GET_ALL_CUSTOMERS);

  if (loading) return <Spinner />;
  if (error) return (
    <Alert status="error">
      <AlertIcon />
      {error.message}
    </Alert>
  );

  return (
    <Box border="1px solid #ccc" borderRadius="md" p={4} mt={4} maxH="300px" overflowY="auto">
      <Text fontWeight="bold" mb={2}>Select a Customer:</Text>
      <VStack align="stretch" spacing={2}>
        {data.getAllCustomers.map(customer => (
          <Box
            key={customer._id}
            p={2}
            borderRadius="md"
            bg="gray.50"
            _hover={{ bg: "blue.50", cursor: "pointer" }}
            onClick={() => onSelect(customer._id)}
          >
            <Text fontSize="sm"><strong>{customer.name}</strong></Text>
            <Text fontSize="xs" color="gray.500">{customer._id}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
