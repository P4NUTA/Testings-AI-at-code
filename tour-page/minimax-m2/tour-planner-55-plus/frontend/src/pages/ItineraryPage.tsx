import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  Badge,
  Button,
  Divider,
  SimpleGrid,
  List,
  ListItem,
  ListIcon,
  Flex,
  Icon,
  useToast,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { CheckIcon, WarningIcon, TimeIcon, AttachmentIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';

const ItineraryPage = () => {
  const { t, i18n } = useTranslation();
  const toast = useToast();
  const [itinerary, setItinerary] = useState<any>(null);
  const [metadata, setMetadata] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const savedItinerary = localStorage.getItem('currentItinerary');
    const savedMetadata = localStorage.getItem('itineraryMetadata');

    if (savedItinerary && savedMetadata) {
      setItinerary(JSON.parse(savedItinerary));
      setMetadata(JSON.parse(savedMetadata));
    }
    setIsLoading(false);
  }, []);

  const saveItinerary = async () => {
    if (!itinerary || !metadata) return;

    setIsSaving(true);
    try {
      const userId = 'anonymous-' + Date.now();

      const response = await fetch('http://localhost:3001/api/v1/itineraries/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          days: metadata.duration,
          startDate: metadata.generatedAt,
          budget: metadata.budget,
          preferences: {},
          itinerary: itinerary.itinerary,
          totalCost: itinerary.totalCost,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: t('common.success'),
          description: t('itinerary.saveSuccess'),
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        const saved = JSON.parse(localStorage.getItem('savedItineraries') || '[]');
        saved.push({ id: result.data.id, data: itinerary, metadata });
        localStorage.setItem('savedItineraries', JSON.stringify(saved));
      }
    } catch (error) {
      toast({
        title: t('common.error'),
        description: 'Failed to save itinerary',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const printItinerary = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="brand.500" />
      </Center>
    );
  }

  if (!itinerary) {
    return (
      <Container maxW="container.xl" py={12}>
        <VStack spacing={8} align="center">
          <Heading>{t('itinerary.noItinerary')}</Heading>
          <Link to="/">
            <Button colorScheme="blue" size="lg">
              {t('itinerary.back')}
            </Button>
          </Link>
        </VStack>
      </Container>
    );
  }

  const locale = i18n.language === 'ru' ? ru : enUS;

  return (
    <Box flex={1} bg="gray.50" py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
            <Box>
              <Heading size="xl" mb={2}>
                {t('itinerary.title')}
              </Heading>
              <Text color="gray.600">
                {metadata.city} • {metadata.duration} {metadata.duration === 1 ? 'день' : 'дня'}
              </Text>
            </Box>
            <HStack>
              <Button
                onClick={saveItinerary}
                colorScheme="blue"
                size="lg"
                isLoading={isSaving}
              >
                {t('itinerary.save')}
              </Button>
              <Button onClick={printItinerary} variant="outline" size="lg">
                {t('itinerary.print')}
              </Button>
            </HStack>
          </Flex>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <Card>
              <CardBody>
                <VStack align="start" spacing={2}>
                  <Text fontSize="sm" color="gray.600">
                    {t('itinerary.totalCost')}
                  </Text>
                  <Heading size="lg">
                    ₽{itinerary.totalCost.toLocaleString()}
                  </Heading>
                </VStack>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <VStack align="start" spacing={2}>
                  <Text fontSize="sm" color="gray.600">
                    {t('itinerary.budgetRemaining')}
                  </Text>
                  <Heading size="lg" color="green.500">
                    ₽{itinerary.budgetRemaining.toLocaleString()}
                  </Heading>
                </VStack>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <VStack align="start" spacing={2}>
                  <Text fontSize="sm" color="gray.600">
                    {t('itinerary.recommendations')}
                  </Text>
                  <Text fontSize="sm">
                    {itinerary.recommendations.length} советов
                  </Text>
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>

          {itinerary.itinerary.map((day: any, dayIndex: number) => (
            <Card key={dayIndex}>
              <CardBody p={8}>
                <VStack align="stretch" spacing={6}>
                  <HStack justify="space-between">
                    <Heading size="lg">
                      {t('itinerary.day')} {day.day}
                    </Heading>
                    <Text color="gray.600">
                      {format(new Date(day.date), 'dd MMMM yyyy', { locale })}
                    </Text>
                  </HStack>

                  <HStack spacing={4}>
                    <Badge colorScheme="blue" fontSize="md" p={2}>
                      {t('itinerary.totalCost')}: ₽{day.totalCost.toLocaleString()}
                    </Badge>
                    <Badge colorScheme="green" fontSize="md" p={2}>
                      {t('itinerary.duration')}: {day.totalDuration} мин
                    </Badge>
                    <Badge colorScheme="purple" fontSize="md" p={2}>
                      {t('weather.temperature')}: {day.weather.temperature}°C
                    </Badge>
                  </HStack>

                  <Divider />

                  <VStack align="stretch" spacing={4}>
                    {day.activities.map((activity: any, actIndex: number) => (
                      <Box
                        key={actIndex}
                        p={6}
                        bg="white"
                        borderRadius="lg"
                        borderWidth="1px"
                        borderColor="gray.200"
                      >
                        <VStack align="stretch" spacing={3}>
                          <HStack justify="space-between" align="start">
                            <VStack align="start" spacing={1}>
                              <Heading size="md">
                                {i18n.language === 'ru'
                                  ? activity.destination.name
                                  : activity.destination.nameEn}
                              </Heading>
                              <Text color="gray.600" fontSize="sm">
                                {activity.destination.category} • {activity.destination.city}
                              </Text>
                            </VStack>
                            <Badge
                              colorScheme={activity.accessibilityScore > 80 ? 'green' : 'yellow'}
                              fontSize="sm"
                            >
                              {t('accessibility.high')}
                            </Badge>
                          </HStack>

                          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
                            <HStack>
                              <Icon as={TimeIcon} color="blue.500" />
                              <VStack align="start" spacing={0}>
                                <Text fontSize="xs" color="gray.600">
                                  {t('itinerary.arrivalTime')}
                                </Text>
                                <Text fontWeight="bold">{activity.arrivalTime}</Text>
                              </VStack>
                            </HStack>

                            <HStack>
                              <Icon as={AttachmentIcon} color="green.500" />
                              <VStack align="start" spacing={0}>
                                <Text fontSize="xs" color="gray.600">
                                  {t('itinerary.duration')}
                                </Text>
                                <Text fontWeight="bold">{activity.duration} мин</Text>
                              </VStack>
                            </HStack>

                            <HStack>
                              <Icon as={CheckIcon} color="purple.500" />
                              <VStack align="start" spacing={0}>
                                <Text fontSize="xs" color="gray.600">
                                  {t('itinerary.estimatedCost')}
                                </Text>
                                <Text fontWeight="bold">₽{activity.estimatedCost}</Text>
                              </VStack>
                            </HStack>

                            <HStack>
                              <Icon as={WarningIcon} color="orange.500" />
                              <VStack align="start" spacing={0}>
                                <Text fontSize="xs" color="gray.600">
                                  {t('itinerary.accessibilityScore')}
                                </Text>
                                <Text fontWeight="bold">{activity.accessibilityScore}%</Text>
                              </VStack>
                            </HStack>
                          </SimpleGrid>

                          {activity.destination.elevatorAvailable && (
                            <Badge colorScheme="green" alignSelf="start">
                              {t('accessibility.elevator')} ✓
                            </Badge>
                          )}
                          {activity.destination.wheelchairAccessible && (
                            <Badge colorScheme="green" alignSelf="start">
                              {t('accessibility.wheelchair')} ✓
                            </Badge>
                          )}
                        </VStack>
                      </Box>
                    ))}
                  </VStack>

                  {day.indoorAlternatives.length > 0 && (
                    <Box p={4} bg="blue.50" borderRadius="md">
                      <Heading size="sm" mb={3}>
                        {t('itinerary.indoorAlternatives')}
                      </Heading>
                      <List spacing={2}>
                        {day.indoorAlternatives.map((alt: any, index: number) => (
                          <ListItem key={index}>
                            <ListIcon as={CheckIcon} color="blue.500" />
                            {alt.name} - {alt.reason}
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                </VStack>
              </CardBody>
            </Card>
          ))}

          <Card>
            <CardBody p={6}>
              <Heading size="md" mb={4}>
                {t('itinerary.recommendations')}
              </Heading>
              <VStack align="stretch" spacing={2}>
                {itinerary.recommendations.map((rec: string, index: number) => (
                  <HStack key={index} align="start">
                    <ListIcon as={CheckIcon} color="green.500" />
                    <Text>{rec}</Text>
                  </HStack>
                ))}
              </VStack>
            </CardBody>
          </Card>

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

export default ItineraryPage;
