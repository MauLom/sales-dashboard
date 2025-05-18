import { Box, Heading, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box>
      <Heading mb={4}>Welcome — Let’s Explore Some Insights</Heading>
      <Text>
        Use the sidebar to navigate through the dashboard and uncover what the data has to say.
      </Text>
      <Text fontSize="sm" mt={4} color="gray.500">
        ⚠️ This interface was crafted as part of a technical challenge. While the environment is simulated,
        the logic and experience are real — just like the challenges you'd find in a growing business.
      </Text>
    </Box>
  );
}
