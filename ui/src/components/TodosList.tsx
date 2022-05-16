import { Badge, Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { useContext } from 'react';
import { TodosContextType } from '../@types/custom';
import { TodosContext } from '../context/TodosContext';
import TEST_IDS from '../testIds';

export default function TodoList() {
  const { todos } = useContext(TodosContext) as TodosContextType;

  if (!todos.length) {
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
    <VStack
      data-testid={ TEST_IDS.todoList }
      align="flex-start"
      borderWidth="1px"
      borderRadius="lg"
      p="2"
    >
      { todos.map(({ id, description, status, createdAt }) => (
        <HStack key={ id } p="1">
          <Badge>{createdAt.toLocaleDateString()}</Badge>
          <Badge>{status}</Badge>
          <Text>{description}</Text>
        </HStack>
      ))}
    </VStack>
  );
}
