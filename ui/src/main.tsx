import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TodosProvider } from './context/TodosContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <TodosProvider>
        <App />
      </TodosProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
