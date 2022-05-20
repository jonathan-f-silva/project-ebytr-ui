import {
  Button, HStack, Input, InputGroup, InputRightElement, Select,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { TodoField } from '../@types/custom';
import {
  TodosContext,
  TodosContextType,
  TODO_FIELDS,
} from '../context/TodosContext';
import TEST_IDS from '../testIds';

export default function TodosHeader() {
  const {
    addTodo, sortOption, setSortOption,
  } = useContext(TodosContext) as TodosContextType;
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
      <Select
        onChange={ (e) => {
          const selectedOption = e.target.value as TodoField;
          setSortOption(selectedOption);
        } }
        value={ sortOption }
        placeholder="Ordenar por"
      >
        {TODO_FIELDS.map((field) => (
          <option key={ field } value={ field }>{field}</option>
        ))}
      </Select>
    </HStack>
  );
}
