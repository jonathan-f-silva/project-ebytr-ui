import {
  Container, HStack, Heading, Image, useColorMode, Button,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

import Todos from './pages/Todos';

import ebytrLogo from './assets/ebytr.svg';

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container
      maxW="80ch"
    >
      {/* Inspiração: https://chakra-templates.dev/navigation/navbar */}
      <HStack justifyContent="space-between" my={ 5 }>
        <HStack as="header" alignItems="center" spacing={ 4 }>
          <Image boxSize="60px" src={ ebytrLogo } alt="logo da Ebytr" />
          <Heading>Ebytr ToDo</Heading>
        </HStack>
        <Button onClick={ toggleColorMode }>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
      </HStack>
      <Todos />
    </Container>
  );
}

export default App;
