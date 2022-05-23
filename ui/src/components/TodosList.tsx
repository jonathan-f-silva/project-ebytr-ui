import { Flex, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { TodosContext, TodosContextType } from '../context/TodosContext';
import TEST_IDS from '../testIds';
import TodosItem from './TodosItem';

export default function TodoList() {
  const { todos } = useContext(TodosContext) as TodosContextType;

  if (!todos || !todos.length) {
    return (
      <Flex
        justifyContent="center"
        borderWidth="1px"
        borderRadius="lg"
        p="3"
      >
        <Text>Sem tarefas. Adicione uma!</Text>
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      data-testid={ TEST_IDS.todoList }
      align="flex-start"
      justifyContent="space-between"
      borderWidth="1px"
      borderRadius="lg"
      p="2"
    >
      { todos.map((todo) => (<TodosItem key={ todo._id } todo={ todo } />))}
    </Flex>
  );
}
