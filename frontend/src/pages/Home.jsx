import { Box, Heading, Text } from "@chakra-ui/react";

export default function Home() {
    return (
        <Box>
            <Heading mb={4}>Welcome to the Analytics Dashboard</Heading>
            <Text>Select a view from the menu to get started.</Text>
            <Text fontSize="sm" mt={4} color="gray.500">
                ⚠️ This tool is part of a technical assessment and simulates an e-commerce data analytics environment.
            </Text>
        </Box>
    );
}
