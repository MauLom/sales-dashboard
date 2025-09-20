import { VStack, Box, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <Box w="200px" h="100vh" position="fixed" bg="gray.100" p={4}>
      <VStack spacing={4} align="start">
        <Link as={NavLink} to="/">🏠 Home</Link>
        <Link as={NavLink} to="/dashboard">📊 Clients</Link>
        <Link as={NavLink} to="/top-products">🛒 Products</Link>
        <Link as={NavLink} to="/sales-analytics">📈 Sellings</Link>
        <Link as={NavLink} to="/orders">📄 Orders</Link>
        <Link as={NavLink} to="/place-order">➕ Place Order</Link>
        <Link as={NavLink} to="/capital-growth">💰 Capital Growth</Link>
      </VStack>
    </Box>
  );
}
