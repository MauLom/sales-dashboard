import { Box } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

export default function Layout({ children }) {
  return (
    <>
      <Box display={{ base: "none", md: "block" }}>
        <Sidebar />
      </Box>
      <Box ml={{ md: "200px" }} p={4}>
        {children}
      </Box>
      <Box display={{ base: "block", md: "none" }}>
        <MobileNav />
      </Box>
    </>
  );
}
