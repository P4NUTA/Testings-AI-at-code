import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#E6F0FF',
      100: '#B3D1FF',
      200: '#80B3FF',
      300: '#4D94FF',
      400: '#1A75FF',
      500: '#005CE6',
      600: '#0049B4',
      700: '#003682',
      800: '#002251',
      900: '#000F21',
    },
    accessible: {
      bg: '#F7FAFC',
      text: '#1A202C',
      accent: '#5B8DEF',
      success: '#38A169',
      warning: '#D69E2E',
      error: '#E53E3E',
    },
  },
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
  },
  fontSizes: {
    xs: '0.875rem',
    sm: '1rem',
    md: '1.125rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '1.875rem',
    '3xl': '2.25rem',
    '4xl': '3rem',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        fontSize: 'lg',
        borderRadius: 'lg',
        _focus: {
          boxShadow: '0 0 0 3px rgba(91, 141, 239, 0.5)',
        },
      },
      sizes: {
        lg: {
          h: 12,
          px: 8,
          fontSize: 'lg',
          minH: 12,
        },
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
            _disabled: {
              bg: 'brand.500',
            },
          },
          _active: {
            bg: 'brand.700',
          },
        },
        ghost: {
          _hover: {
            bg: 'gray.100',
          },
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          fontSize: 'lg',
          _focus: {
            borderColor: 'brand.500',
            boxShadow: '0 0 0 1px #5B8DEF',
          },
        },
      },
      sizes: {
        lg: {
          field: {
            h: 12,
            fontSize: 'lg',
            minH: 12,
          },
        },
      },
    },
    Select: {
      baseStyle: {
        field: {
          fontSize: 'lg',
          _focus: {
            borderColor: 'brand.500',
            boxShadow: '0 0 0 1px #5B8DEF',
          },
        },
      },
      sizes: {
        lg: {
          field: {
            h: 12,
            fontSize: 'lg',
            minH: 12,
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: 'bold',
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'xl',
          boxShadow: 'md',
          overflow: 'hidden',
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'accessible.bg',
        color: 'accessible.text',
        fontSize: 'md',
        lineHeight: '1.6',
      },
      '*:focus': {
        outline: 'none',
      },
      a: {
        _focus: {
          boxShadow: '0 0 0 3px rgba(91, 141, 239, 0.5)',
        },
      },
    },
  },
});
