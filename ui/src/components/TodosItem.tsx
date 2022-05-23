import { useContext } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import {
  Badge, Button, Editable, EditableInput, EditablePreview,
  HStack, IconButton, Input, Spacer,
} from '@chakra-ui/react';
import { Todo } from '../@types/custom';
import { TodosContext, TodosContextType, TODO_STATUSES } from '../context/TodosContext';
import TEST_IDS from '../testIds';

type TodosItemProps = {
  todo: Todo,
}

export default function TodosItem({ todo }: TodosItemProps) {
  const { _id, createdAt, description, status } = todo;
  const {
    deleteTodo, updateTodo, updateTodoStatus,
  } = useContext(TodosContext) as TodosContextType;

  const cycleTodoStatus = (todoId: Todo['_id'], currentStatus: Todo['status']) => {
    const currentIndex = TODO_STATUSES.indexOf(currentStatus);
    const nextIndex = TODO_STATUSES.length === (currentIndex + 1) ? 0 : currentIndex + 1;
    const newStatus = TODO_STATUSES[nextIndex] as Todo['status'];

    updateTodoStatus(todoId, newStatus);
  };

  return (
    <HStack
      key={ _id }
      justifyContent="space-between"
      w="100%"
      p="1"
    >
      <Badge>{new Date(createdAt).toLocaleDateString()}</Badge>
      <Editable defaultValue={ description }>
        <EditablePreview />
        <Input
          as={ EditableInput }
          value={ description }
          onBlur={ (e) => updateTodo(_id, { description: e.target.value }) }
        />
      </Editable>
      <Spacer />
      <Button
        size="xs"
        onClick={ () => cycleTodoStatus(_id, status) }
      >
        {status}
      </Button>
      <IconButton
        data-testid={ `${TEST_IDS.todoDelButton}-${_id}` }
        size="xs"
        aria-label={ `deletar tarefa ${description}` }
        icon={ <DeleteIcon /> }
        onClick={ () => deleteTodo(_id) }
      />
    </HStack>
  );
}
