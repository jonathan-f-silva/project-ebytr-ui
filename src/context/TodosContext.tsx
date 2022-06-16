import PropTypes from 'prop-types';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import { ChildrenProps, Todo, TodoField } from '../@types/custom';

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

export const TODO_STATUSES = ['A fazer', 'Em andamento', 'Concluído! 🎉'];
export const TODO_FIELDS: TodoField[] = ['createdAt', 'description', 'status'];

const API_URL = import.meta.env.VITE_API_URL;
const ENDPOINT = API_URL ? `${API_URL}/api` : '/api';

const API = axios.create({
  baseURL: ENDPOINT,
});

// React com TS é complexo!
// https://blog.logrocket.com/how-to-use-react-context-typescript/
export const TodosContext = createContext<TodosContextType | null>(null);

export const TodosProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [sortOption, setSortOption] = useState<TodoField>('createdAt');

  const sortTodos = useCallback((unsortedTodos = [] as Todo[]) => {
    const sortedTodos = unsortedTodos.sort((a, b) => {
      const REVERSE = -1;
      if (a[sortOption].toLowerCase() > b[sortOption].toLowerCase()) {
        return 1;
      }
      return REVERSE;
    });
    return sortedTodos;
  }, [sortOption]);

  const getTodos = useCallback(async () => {
    try {
      const { data } = await API.get<Todo []>('/todos');
      if (data) {
        setTodos(sortTodos(data));
      }
    } catch (err) {
      const { message } = err as Error;
      setError(message);
    }
  }, [sortTodos]);

  const addTodo = useCallback(async (description: string) => {
    try {
      await API.post('/todos', {
        description,
        status: 'A fazer',
      });
      await getTodos();
    } catch (err) {
      const { message } = err as Error;
      setError(message);
    }
  }, [getTodos]);

  const updateTodo = useCallback(
    async (todoId: Todo['_id'], update: Partial<Todo>) => {
      try {
        await API.put(`/todos/${todoId}`, {
          ...update,
        });
        await getTodos();
      } catch (err) {
        const { message } = err as Error;
        setError(message);
      }
    }, [getTodos],
  );

  const updateTodoStatus = useCallback(
    async (todoId: Todo['_id'], status: Todo['status']) => {
      try {
        await API.patch(`/todos/${todoId}/status`, {
          status,
        });
        await getTodos();
      } catch (err) {
        const { message } = err as Error;
        setError(message);
      }
    }, [getTodos],
  );

  const deleteTodo = useCallback(
    async (todoId: Todo['_id']) => {
      try {
        await API.delete(`/todos/${todoId}`);
        await getTodos();
      } catch (err) {
        const { message } = err as Error;
        setError(message);
      }
    }, [getTodos],
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
