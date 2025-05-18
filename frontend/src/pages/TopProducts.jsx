import { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  Box,
  Heading,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Alert,
  AlertIcon,
  NumberInput,
  NumberInputField,
  FormControl,
  FormLabel,
  HStack
} from "@chakra-ui/react";
import { GET_TOP_PRODUCTS } from "../graphql/queries";

export default function TopProducts() {
  const [limit, setLimit] = useState(5);

  const { loading, error, data } = useQuery(GET_TOP_PRODUCTS, {
    variables: { limit }
  });

  const handleSelectChange = (e) => {
    setLimit(parseInt(e.target.value));
  };

  const handleNumberChange = (value) => {
    const intValue = parseInt(value);
    if (!isNaN(intValue) && intValue > 0) {
      setLimit(intValue);
    }
  };

  return (
    <Box maxW="3xl" mx="auto" mt={10} p={6}>
      <Heading size="md" mb={4}>Top Selling Products</Heading>

      <HStack mb={4} spacing={6}>
        <FormControl maxW="200px">
          <FormLabel fontSize="sm">Quick Limit</FormLabel>
          <Select value={limit} onChange={handleSelectChange}>
            <option value={5}>Top 5</option>
            <option value={10}>Top 10</option>
            <option value={20}>Top 20</option>
          </Select>
        </FormControl>

        <FormControl maxW="200px">
          <FormLabel fontSize="sm">Custom Limit</FormLabel>
          <NumberInput min={1} defaultValue={limit} onChange={handleNumberChange}>
            <NumberInputField />
          </NumberInput>
        </FormControl>
      </HStack>

      {loading && <Spinner />}
      {error && (
        <Alert status="error">
          <AlertIcon />
          Error: {error.message}
        </Alert>
      )}

      {data?.getTopSellingProducts?.length > 0 && (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th isNumeric>Quantity Sold</Th>
              <Th isNumeric>Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.getTopSellingProducts.map((product, index) => (
              <Tr key={index}>
                <Td>{product.name}</Td>
                <Td isNumeric>{product.quantitySold}</Td>
                <Td isNumeric>${product.price.toFixed(2)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
}
