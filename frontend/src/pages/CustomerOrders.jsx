import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  Box, Heading, Input, Button, VStack, Spinner, Alert, AlertIcon, Table, Thead, Tbody, Tr, Th, Td, HStack
} from "@chakra-ui/react";
import { GET_CUSTOMER_ORDERS } from "../graphql/queries";
import CustomerSearchList from "../components/CustomerSearchList";

export default function CustomerOrders() {
  const [customerId, setCustomerId] = useState("");
  const [page, setPage] = useState(1);
  const [getOrders, { loading, error, data }] = useLazyQuery(GET_CUSTOMER_ORDERS);

  const handleSearch = () => {
    if (customerId.trim()) getOrders({ variables: { customerId, page, limit: 5 } });
  };

  const nextPage = () => setPage(prev => prev + 1);
  const prevPage = () => setPage(prev => Math.max(1, prev - 1));

  useEffect(() => {
    if (customerId.trim()) {
      getOrders({ variables: { customerId, page, limit: 5 } });
    }
  }, [page, customerId, getOrders]);

  return (
    <Box p={4} maxW="lg" mx="auto">
      <CustomerSearchList onSelect={(id) => {
        setCustomerId(id)
        setPage(1);
      }
      } />

      <Box maxW="4xl" mx="auto" mt={10} p={6}>
        <Heading size="md" mb={4}>Customer Orders</Heading>
        <VStack spacing={4} align="stretch" mb={6}>
          <Input placeholder="Customer ID" value={customerId} onChange={(e) => {
            setCustomerId(e.target.value)
            setPage(1);
          }
          } />
          <Button colorScheme="blue" onClick={handleSearch}>Search</Button>
        </VStack>

        {loading && <Spinner />}
        {error && <Alert status="error"><AlertIcon />{error.message}</Alert>}
        {data?.getCustomerOrders?.length === 0 && (
          <Box textAlign="center" py={10} color="gray.500">
            <Heading size="sm" mb={2}>Oops, no more records found</Heading>
            <Box fontSize="sm">Try going back to a previous page or selecting a different customer.</Box>
          </Box>
        )}


        {data?.getCustomerOrders?.length > 0 && (
          <>
            <Table variant="simple" mb={4}>
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th isNumeric>Total</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.getCustomerOrders.map(order => (
                  <Tr key={order._id}>
                    <Td>{new Date(Number(order.orderDate)).toLocaleDateString()}</Td>
                    <Td isNumeric>${order.totalAmount.toFixed(2)}</Td>
                    <Td>{order.status}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            <HStack spacing={4} justify="center">
              <Button onClick={prevPage} isDisabled={page === 1}>Previous</Button>
              <Button onClick={nextPage}>Next</Button>
            </HStack>
          </>
        )}
      </Box>
    </Box>


  );
}