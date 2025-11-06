import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Select,
  Input,
  NumberInput,
  NumberInputField,
  Checkbox,
  Button,
  HStack,
  Card,
  CardBody,
  SimpleGrid,
  useToast,
  Divider,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface FormData {
  days: number;
  startDate: string;
  budget: number;
  city: string;
  accessibility: boolean;
  avoidStairs: boolean;
  restAreas: boolean;
  maxWalkingDistance: number;
  indoorPreference: 'indoor' | 'outdoor' | 'mixed';
}

const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      days: 2,
      budget: 5000,
      city: 'Saint Petersburg',
      accessibility: true,
      avoidStairs: true,
      restAreas: true,
      maxWalkingDistance: 500,
      indoorPreference: 'mixed',
    },
  });

  const days = watch('days');
  const budget = watch('budget');
  const maxWalkingDistance = watch('maxWalkingDistance');

  const cities = [
    'Saint Petersburg',
    'Peterhof',
    'Pushkin',
    'Pavlovsk',
    'Gatchina',
    'Tikhvin',
    'Ladoga',
    'Shlisselburg',
  ];

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/v1/itineraries/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          preferences: {
            accessibility: data.accessibility,
            avoidStairs: data.avoidStairs,
            restAreas: data.restAreas,
            maxWalkingDistance: data.maxWalkingDistance,
            indoorPreference: data.indoorPreference,
          },
        }),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem('currentItinerary', JSON.stringify(result.data));
        localStorage.setItem('itineraryMetadata', JSON.stringify(result.metadata));
        navigate('/itinerary');
      } else {
        throw new Error(result.error || 'Failed to generate itinerary');
      }
    } catch (error) {
      toast({
        title: t('common.error'),
        description: error instanceof Error ? error.message : 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box flex={1} bg="gray.50" py={12}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading size="2xl" mb={4}>
              {t('app.title')}
            </Heading>
            <Text fontSize="xl" color="gray.600">
              {t('app.subtitle')}
            </Text>
            <Text fontSize="lg" color="gray.500" mt={2}>
              {t('app.tagline')}
            </Text>
          </Box>

          <Card maxW="3xl" mx="auto" w="full">
            <CardBody p={8}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={6} align="stretch">
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    <FormControl isRequired>
                      <FormLabel fontSize="lg">{t('form.days')}</FormLabel>
                      <Select {...register('days', { required: true })} size="lg">
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                      </Select>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel fontSize="lg">{t('form.startDate')}</FormLabel>
                      <Input
                        type="date"
                        {...register('startDate', { required: true })}
                        size="lg"
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel fontSize="lg">{t('form.budget')}</FormLabel>
                      <NumberInput
                        value={budget}
                        onChange={(_, val) => setValue('budget', val || 0)}
                        min={1000}
                        max={100000}
                        step={500}
                        size="lg"
                      >
                        <NumberInputField {...register('budget', { required: true, min: 1000 })} />
                      </NumberInput>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel fontSize="lg">{t('form.city')}</FormLabel>
                      <Select {...register('city', { required: true })} size="lg">
                        {cities.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </SimpleGrid>

                  <Divider />

                  <Heading size="md">{t('form.preferences')}</Heading>

                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    <FormControl>
                      <FormLabel fontSize="lg">{t('form.indoorPreference')}</FormLabel>
                      <Select {...register('indoorPreference')} size="lg">
                        <option value="indoor">{t('form.indoor')}</option>
                        <option value="outdoor">{t('form.outdoor')}</option>
                        <option value="mixed">{t('form.mixed')}</option>
                      </Select>
                    </FormControl>

                    <FormControl>
                      <FormLabel fontSize="lg">
                        {t('form.maxWalkingDistance')}: {maxWalkingDistance}м
                      </FormLabel>
                      <Slider
                        value={maxWalkingDistance}
                        onChange={(val) => setValue('maxWalkingDistance', val)}
                        min={100}
                        max={1000}
                        step={100}
                        mt={6}
                      >
                        <SliderMark value={100} mt={2} ml={-2} fontSize="sm">
                          100м
                        </SliderMark>
                        <SliderMark value={500} mt={2} ml={-4} fontSize="sm">
                          500м
                        </SliderMark>
                        <SliderMark value={1000} mt={2} ml={-5} fontSize="sm">
                          1000м
                        </SliderMark>
                        <SliderTrack>
                          <SliderFilledTrack bg="brand.500" />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                    </FormControl>
                  </SimpleGrid>

                  <VStack align="stretch" spacing={3}>
                    <Checkbox {...register('accessibility')} size="lg">
                      {t('form.accessibility')}
                    </Checkbox>
                    <Checkbox {...register('avoidStairs')} size="lg">
                      {t('form.avoidStairs')}
                    </Checkbox>
                    <Checkbox {...register('restAreas')} size="lg">
                      {t('form.restAreas')}
                    </Checkbox>
                  </VStack>

                  <HStack justify="flex-end" spacing={4}>
                    <Button
                      type="button"
                      variant="ghost"
                      size="lg"
                      onClick={() => {
                        setValue('days', 2);
                        setValue('budget', 5000);
                        setValue('city', 'Saint Petersburg');
                        setValue('accessibility', true);
                        setValue('avoidStairs', true);
                        setValue('restAreas', true);
                        setValue('maxWalkingDistance', 500);
                        setValue('indoorPreference', 'mixed');
                      }}
                    >
                      {t('form.reset')}
                    </Button>

                    <Button
                      type="submit"
                      colorScheme="blue"
                      size="lg"
                      isLoading={isLoading}
                      loadingText={t('form.generating')}
                      minW="200px"
                    >
                      {t('form.generate')}
                    </Button>
                  </HStack>
                </VStack>
              </form>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Box>
  );
};

export default HomePage;
