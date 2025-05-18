import { HStack, Link, Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function MobileNav() {
  return (
    <Box position="fixed" bottom={0} w="100%" bg="white" borderTop="1px solid #ddd" p={2}>
      <HStack justify="space-around">
        <Link as={NavLink} to="/">🏠</Link>
        <Link as={NavLink} to="/dashboard">📊</Link>
        <Link as={NavLink} to="/top-products">🛒</Link>
        <Link as={NavLink} to="/sales-analytics">📈</Link>
        <Link as={NavLink} to="/orders">📄</Link>
        <Link as={NavLink} to="/place-order">➕</Link>
      </HStack>
    </Box>
  );
}
