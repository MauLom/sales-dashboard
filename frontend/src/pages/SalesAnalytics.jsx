import { useState } from "react";
import {
  Box,
  Heading,
  Input,
  VStack,
  Button,
  Text,
  Spinner,
  Alert,
  AlertIcon
} from "@chakra-ui/react";
import { useLazyQuery } from "@apollo/client";
import { GET_SALES_ANALYTICS } from "../graphql/queries";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function SalesAnalytics() {
  const [startDate, setStartDate] = useState("2024-12-01");
  const [endDate, setEndDate] = useState("2025-12-31");
  const [getAnalytics, { loading, error, data }] = useLazyQuery(GET_SALES_ANALYTICS);

  const handleSearch = () => {
    getAnalytics({ variables: { startDate, endDate } });
  };

  return (
    <Box maxW="4xl" mx="auto" mt={10} p={6}>
      <Heading size="md" mb={4}>Análisis de Ventas</Heading>

      <VStack spacing={4} align="stretch" mb={6}>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleSearch}>Consultar</Button>
      </VStack>

      {loading && <Spinner />}
      {error && (
        <Alert status="error">
          <AlertIcon />
          Error: {error.message}
        </Alert>
      )}

      {data?.getSalesAnalytics && (
        <>
          <Box mb={6}>
            <Text><strong>Total de ingresos:</strong> ${data.getSalesAnalytics.totalRevenue.toFixed(2)}</Text>
            <Text><strong>Órdenes completadas:</strong> {data.getSalesAnalytics.completedOrders}</Text>
          </Box>

          <Box h="300px">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.getSalesAnalytics.revenuePerCategory}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#3182ce" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </>
      )}
    </Box>
  );
}
