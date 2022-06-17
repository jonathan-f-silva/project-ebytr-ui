import { useContext, useEffect, useState } from 'react';
import { CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Button, HStack, IconButton, Input, Spacer, Text } from '@chakra-ui/react';
import type { Todo } from '../@types/custom';
import { TodosContext, TodosContextType } from '../context/TodosContext';
import TEST_IDS from '../utils/testIds';
import { TODO_STATUSES } from '../utils/custom';

type TodosItemProps = {
  todo: Todo,
}

export default function TodosItem({ todo }: TodosItemProps) {
  const { _id, createdAt, description, status } = todo;
  const [editMode, setEditMode] = useState(false);
  const [editDescription, setEditDescription] = useState(description);
  const {
    deleteTodo, updateTodo, updateTodoStatus,
  } = useContext(TodosContext) as TodosContextType;

  const cycleTodoStatus = (todoId: Todo['_id'], currentStatus: Todo['status']) => {
    const currentIndex = TODO_STATUSES.indexOf(currentStatus);
    const nextIndex = TODO_STATUSES.length === (currentIndex + 1) ? 0 : currentIndex + 1;
    const newStatus = TODO_STATUSES[nextIndex] as Todo['status'];

    updateTodoStatus(todoId, newStatus);
  };

  useEffect(() => {
    setEditMode(false);
  }, [todo]);

  return (
    <HStack
      key={ _id }
      justifyContent="space-between"
      w="100%"
      p="1"
    >
      <Text
        fontWeight="bold"
        background="ButtonFace"
        px="1"
        borderRadius="5"
      >
        {new Date(createdAt).toLocaleDateString()}
      </Text>
      {
        editMode
          ? (
            <Input
              value={ editDescription }
              onChange={ (e) => setEditDescription(e.target.value) }
            />
          )
          : <Text px="4">{description}</Text>
      }
      <Spacer />
      <Button
        data-testid={ `${TEST_IDS.todoStatusButton}-${_id}` }
        minW="10em"
        onClick={ () => cycleTodoStatus(_id, status) }
      >
        {status}
      </Button>
      {
        editMode
          ? (
            <IconButton
              data-testid={ `${TEST_IDS.todoSaveButton}-${_id}` }
              aria-label={ `salvar tarefa ${description}` }
              icon={ <CheckIcon /> }
              onClick={ () => updateTodo(_id, { description: editDescription }) }
            />
          )
          : (
            <IconButton
              data-testid={ `${TEST_IDS.todoEditButton}-${_id}` }
              aria-label={ `editar tarefa ${description}` }
              icon={ <EditIcon /> }
              onClick={ () => setEditMode(!editMode) }
            />
          )
      }
      <IconButton
        data-testid={ `${TEST_IDS.todoDelButton}-${_id}` }
        aria-label={ `deletar tarefa ${description}` }
        icon={ <DeleteIcon /> }
        onClick={ () => deleteTodo(_id) }
      />
    </HStack>
  );
}
