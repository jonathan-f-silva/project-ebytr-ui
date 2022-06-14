import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TodosProvider } from './context/TodosContext';

const customTheme = extendTheme({
  semanticTokens: {
    colors: {
      error: 'red.500',
      success: 'green.500',
      primary: {
        default: 'pink.800',
        _dark: 'red.400',
      },
      secondary: {
        default: 'red.800',
        _dark: 'red.700',
      },
    },
  },
  colors: {
    brand: {
      50: '#E4A4C6',
      100: '#DA81B0',
      200: '#CF5D9A',
      300: '#C53A84',
      400: '#9E2E6A',
      500: '#76234F',
      600: '#4F1735',
      700: '#270C1A',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={ customTheme }>
      {/* <ChakraProvider>  */}
      <TodosProvider>
        <App />
      </TodosProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
