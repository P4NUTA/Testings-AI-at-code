import {
  Box,
  Container,
  Heading,
  VStack,
  Card,
  CardBody,
  Text,
  Button,
  SimpleGrid,
  HStack,
  Badge,
  Center,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SavedPage = () => {
  const { t } = useTranslation();
  const [savedItineraries, setSavedItineraries] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedItineraries');
    if (saved) {
      setSavedItineraries(JSON.parse(saved));
    }
  }, []);

  const loadItinerary = (itinerary: any) => {
    localStorage.setItem('currentItinerary', JSON.stringify(itinerary.data));
    window.location.href = '/itinerary';
  };

  return (
    <Box flex={1} bg="gray.50" py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Heading size="xl">{t('nav.saved')}</Heading>

          {savedItineraries.length === 0 ? (
            <Center py={20}>
              <VStack spacing={4}>
                <Text fontSize="xl" color="gray.600">
                  {t('ui.noData')}
                </Text>
                <Link to="/">
                  <Button colorScheme="blue" size="lg">
                    {t('itinerary.back')}
                  </Button>
                </Link>
              </VStack>
            </Center>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {savedItineraries.map((item, index) => (
                <Card key={index} cursor="pointer" _hover={{ boxShadow: 'lg' }}>
                  <CardBody>
                    <VStack align="stretch" spacing={4}>
                      <Heading size="md">
                        Маршрут #{item.id || index + 1}
                      </Heading>

                      <VStack align="stretch" spacing={2}>
                        <HStack>
                          <Badge colorScheme="blue">
                            {item.metadata?.duration || 2} дня
                          </Badge>
                          <Badge colorScheme="green">
                            ₽{item.data?.totalCost?.toLocaleString() || 0}
                          </Badge>
                        </HStack>

                        <Text fontSize="sm" color="gray.600">
                          {item.metadata?.city || 'Санкт-Петербург'}
                        </Text>
                      </VStack>

                      <Button
                        colorScheme="blue"
                        onClick={() => loadItinerary(item)}
                        size="lg"
                      >
                        Открыть
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          )}

          <Link to="/">
            <Button variant="outline" size="lg" w="full">
              {t('itinerary.back')}
            </Button>
          </Link>
        </VStack>
      </Container>
    </Box>
  );
};

export default SavedPage;
