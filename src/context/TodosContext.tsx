import PropTypes from 'prop-types';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import type { ChildrenProps, Todo, TodoField } from '../@types/custom';
import { ApiTodoService } from '../services/ApiTodoService';
import { TodoService } from '../services/TodoService';

export type TodosContextType = {
  error: string | null,
  todos: Todo[] | null,
  sortOption: TodoField,
  addTodo: (description: Todo['description']) => void,
  deleteTodo: (todoId: Todo['_id']) => void,
  setSortOption: (option: TodoField) => void;
  updateTodo: (todoId: Todo['_id'], update: Partial<Todo>) => void,
  updateTodoStatus: (todoId: Todo['_id'], status: Todo['status']) => void,
}

// React com TS é complexo!
// https://blog.logrocket.com/how-to-use-react-context-typescript/
export const TodosContext = createContext<TodosContextType | null>(null);

export const TodosProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [sortOption, setSortOption] = useState<TodoField>('createdAt');

  const todoService: TodoService = useMemo(
    () => new ApiTodoService(sortOption), [sortOption],
  );

  const getTodos = useCallback(async () => {
    try {
      const data = await todoService.getTodos();
      setTodos(data);
    } catch (err) {
      const { message } = err as Error;
      setError(message);
    }
  }, [todoService]);

  const addTodo = useCallback(async (description: string) => {
    try {
      const data = await todoService.addTodo(description);
      setTodos(data);
    } catch (err) {
      const { message } = err as Error;
      setError(message);
    }
  }, [todoService]);

  const updateTodo = useCallback(
    async (todoId: Todo['_id'], update: Partial<Todo>) => {
      try {
        const data = await todoService.updateTodo(todoId, update);
        setTodos(data);
      } catch (err) {
        const { message } = err as Error;
        setError(message);
      }
    }, [todoService],
  );

  const updateTodoStatus = useCallback(
    async (todoId: Todo['_id'], status: Todo['status']) => {
      try {
        const data = await todoService.updateTodoStatus(todoId, status);
        setTodos(data);
      } catch (err) {
        const { message } = err as Error;
        setError(message);
      }
    }, [todoService],
  );

  const deleteTodo = useCallback(
    async (todoId: Todo['_id']) => {
      try {
        const data = await todoService.deleteTodo(todoId);
        setTodos(data);
      } catch (err) {
        const { message } = err as Error;
        setError(message);
      }
    }, [todoService],
  );

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  // valeu Lint! não conhecia esse! - https://usehooks.com/useMemo/
  const context: TodosContextType = useMemo(() => (
    {
      error,
      todos,
      sortOption,
      addTodo,
      deleteTodo,
      setSortOption,
      updateTodo,
      updateTodoStatus,
    }
  ), [
    error, todos, sortOption,
    setSortOption, addTodo, deleteTodo, updateTodo, updateTodoStatus,
  ]);

  return (
    <TodosContext.Provider value={ context }>
      {children}
    </TodosContext.Provider>
  );
};

TodosProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
