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
  AlertIcon
} from "@chakra-ui/react";
import { GET_TOP_PRODUCTS } from "../graphql/queries";

export default function TopProducts() {
  const [limit, setLimit] = useState(5);

  const { loading, error, data } = useQuery(GET_TOP_PRODUCTS, {
    variables: { limit }
  });

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
  };

  return (
    <Box maxW="3xl" mx="auto" mt={10} p={6}>
      <Heading size="md" mb={4}>Productos Más Vendidos</Heading>

      <Select value={limit} onChange={handleLimitChange} mb={4} maxW="200px">
        <option value={5}>Top 5</option>
        <option value={10}>Top 10</option>
        <option value={20}>Top 20</option>
      </Select>

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
              <Th>Nombre</Th>
              <Th isNumeric>Cantidad Vendida</Th>
              <Th isNumeric>Precio</Th>
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
