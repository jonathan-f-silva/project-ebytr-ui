import { Box } from '@chakra-ui/react';
import TodosHeader from '../components/TodosHeader';
import TodoList from '../components/TodosList';

export default function Todos() {
  return (
    <Box as="main">
      <TodosHeader />
      <TodoList />
    </Box>
  );
}
