import {
  Box,
  Flex,
  Heading,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useColorMode,
  useTranslation,
} from '@chakra-ui/react';
import { ChevronDownIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation as useI18next } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();
  const { language } = useI18next();

  const changeLanguage = (lng: 'ru' | 'en') => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const getLanguageName = (lng: string) => {
    return lng === 'ru' ? 'Русский' : 'English';
  };

  return (
    <Box bg="white" boxShadow="sm" position="sticky" top={0} zIndex={100}>
      <Flex
        maxW="container.xl"
        mx="auto"
        px={4}
        h={20}
        align="center"
        justify="space-between"
      >
        <Link to="/">
          <Heading
            size="xl"
            bgGradient="linear(to-r, brand.500, brand.700)"
            bgClip="text"
            fontSize="2xl"
            fontWeight="bold"
            _hover={{ opacity: 0.8 }}
          >
            {t('app.title')}
          </Heading>
        </Link>

        <HStack spacing={6}>
          <HStack spacing={4}>
            <Link to="/">
              <Button
                variant={location.pathname === '/' ? 'solid' : 'ghost'}
                colorScheme={location.pathname === '/' ? 'blue' : 'gray'}
                size="lg"
              >
                {t('nav.home')}
              </Button>
            </Link>

            <Link to="/itinerary">
              <Button
                variant={location.pathname === '/itinerary' ? 'solid' : 'ghost'}
                colorScheme={location.pathname === '/itinerary' ? 'blue' : 'gray'}
                size="lg"
              >
                {t('nav.itinerary')}
              </Button>
            </Link>

            <Link to="/saved">
              <Button
                variant={location.pathname === '/saved' ? 'solid' : 'ghost'}
                colorScheme={location.pathname === '/saved' ? 'blue' : 'gray'}
                size="lg"
              >
                {t('nav.saved')}
              </Button>
            </Link>
          </HStack>

          <HStack spacing={2}>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant="outline"
                size="lg"
              >
                {getLanguageName(i18n.language)}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => changeLanguage('ru')}>
                  Русский
                </MenuItem>
                <MenuItem onClick={() => changeLanguage('en')}>
                  English
                </MenuItem>
              </MenuList>
            </Menu>

            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              size="lg"
            />
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
