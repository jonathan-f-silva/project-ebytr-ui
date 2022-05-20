import { Button, HStack, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { TodosContext, TodosContextType } from '../context/TodosContext';
import TEST_IDS from '../testIds';

export default function TodosHeader() {
  const { addTodo } = useContext(TodosContext) as TodosContextType;
  const [inputText, setInputText] = useState('');

  const sendTodo = () => {
    addTodo(inputText);
    setInputText('');
  };

  return (
    <HStack mb={ 5 }>
      <Input
        data-testid={ TEST_IDS.todoInput }
        placeholder="Digite uma tarefa"
        onChange={ (e) => setInputText(e.target.value) }
        value={ inputText }
      />
      <Button
        colorScheme="brand"
        data-testid={ TEST_IDS.todoAddButton }
        type="button"
        onClick={ sendTodo }
        disabled={ inputText === '' }
        minW="10rem"
      >
        Adicionar tarefa
      </Button>
    </HStack>
  );
}
