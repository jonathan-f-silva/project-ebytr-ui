import PropTypes from 'prop-types';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import { ChildrenProps, Todo } from '../@types/custom';

export type TodosContextType = {
  todos: Todo[] | null,
  addTodo: (description: Todo['description']) => void,
  updateTodo: (todoId: Todo['_id'], update: Partial<Todo>) => void,
  updateTodoStatus: (todoId: Todo['_id'], status: Todo['status']) => void,
}

// React com TS é complexo!
// https://blog.logrocket.com/how-to-use-react-context-typescript/
export const TodosContext = createContext<TodosContextType | null>(null);

export const TodosProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);
  const [todos, setTodos] = useState<Todo[] | null>(null);

  const getTodos = useCallback(async () => {
    const ENDPOINT = '/api';
    const API = axios.create({
      baseURL: ENDPOINT,
    });
    try {
      const { data } = await API.get('/todos');
      setTodos(data);
    } catch (err) {
      const { message } = err as Error;
      setError(message);
    }
  }, []);

  const addTodo = useCallback(async (description: string) => {
    const ENDPOINT = '/api';
    const API = axios.create({
      baseURL: ENDPOINT,
    });
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
    async (todoId: string, update: Partial<Todo>) => {
      const ENDPOINT = '/api';
      const API = axios.create({
        baseURL: ENDPOINT,
      });
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
    async (todoId: string, status: Todo['status']) => {
      const ENDPOINT = '/api';
      const API = axios.create({
        baseURL: ENDPOINT,
      });
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

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  // valeu Lint! não conhecia esse! - https://usehooks.com/useMemo/
  const context = useMemo(() => (
    {
      error,
      todos,
      addTodo,
      updateTodo,
      updateTodoStatus,
    }
  ), [error, todos, addTodo, updateTodo, updateTodoStatus]);

  return (
    <TodosContext.Provider value={ context }>
      {children}
    </TodosContext.Provider>
  );
};

TodosProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
