import type { Todo } from '../@types/custom';
import { TodoService } from './TodoService';

export class MemoryTodoService extends TodoService {
  private todos = [] as Todo[];

  getTodos = async () => this.todos;

  addTodo = async (description: string) => {
    this.todos = [
      ...this.todos,
      {
        _id: String(Math.random()) + description,
        description,
        status: 'A fazer',
        createdAt: (new Date()).toISOString(),
      },
    ];
    return this.todos;
  };

  updateTodo = async (todoId: Todo['_id'], update: Partial<Todo>) => {
    this.todos = this.todos.map((todo) => {
      if (todo._id === todoId) return ({ ...todo, ...update });
      return todo;
    });
    return this.todos;
  };

  updateTodoStatus = async (
    todoId: Todo['_id'], status: Todo['status'],
  ) => this.updateTodo(todoId, { status });

  deleteTodo = async (todoId: Todo['_id']) => {
    this.todos = this.todos.filter(({ _id }) => _id !== todoId);
    return this.todos;
  };
}
