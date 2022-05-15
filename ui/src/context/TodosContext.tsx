import PropTypes from 'prop-types';
import { createContext, ReactNode, useCallback, useMemo, useState } from 'react';
import { ChildrenProps, Todo, TodosContextType } from '../@types/custom';

// React com TS é complexo!
// https://blog.logrocket.com/how-to-use-react-context-typescript/
export const TodosContext = createContext<TodosContextType | null>(null);

export const TodosProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = useCallback((description: string) => {
    setTodos([
      ...todos,
      {
        id: description + Math.random().toString(),
        description,
        status: 'A fazer',
        createdAt: new Date(),
      },
    ]);
  }, [todos]);

  // valeu Lint! não conhecia esse! - https://usehooks.com/useMemo/
  const context = useMemo(() => (
    {
      todos,
      addTodo,
    }
  ), [todos, addTodo]);

  return (
    <TodosContext.Provider value={ context }>
      {children}
    </TodosContext.Provider>
  );
};

TodosProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
