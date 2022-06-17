import type { Todo, TodoField } from '../@types/custom';

export abstract class TodoService {
  constructor(public sortOption: TodoField) { }

  sortTodos = (unsortedTodos = [] as Todo[]) => {
    const sortedTodos = unsortedTodos.sort((a, b) => {
      const REVERSE = -1;
      if (a[this.sortOption].toLowerCase() > b[this.sortOption].toLowerCase()) {
        return 1;
      }
      return REVERSE;
    });
    return sortedTodos;
  };

  abstract getTodos: () => Promise<Todo[]>;

  abstract addTodo: (description: string) => Promise<Todo[]>;

  abstract updateTodo: (todoId: Todo['_id'], update: Partial<Todo>)
    => Promise<Todo[]>;

  abstract updateTodoStatus: (todoId: Todo['_id'], status: Todo['status'])
    => Promise<Todo[]>;

  abstract deleteTodo: (todoId: Todo['_id']) => Promise<Todo[]>;
}
