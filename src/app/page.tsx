import { Box, Text, Button, Heading } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <Box
      position="relative"
      backgroundImage="url('https://firebasestorage.googleapis.com/v0/b/naeolemariowedding.firebasestorage.app/o/Nae%26Mario%2FIMG_1442.JPG?alt=media&token=8ef23874-47a7-47ee-9df3-ff0995ff428a')" // Caminho correto da imagem
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
    >
      <Box textAlign="center" p={5}>
        <Heading as="h1" size="2xl" mb={4}>
          Sejam bem-vindos ao nosso <span id="span1">dia especial</span>
        </Heading>
        <Text fontSize="xl" mb={8}>
          Estamos muito felizes em compartilhar esse momento com vocês{" "}
        </Text>
        <Button colorScheme="teal" size="sm">
          Confirme a sua presença
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
