import axios from 'axios';
import type { Todo } from '../@types/custom';
import { TodoService } from './TodoService';

export class ApiTodoService extends TodoService {
  API_URL = import.meta.env.VITE_API_URL;

  ENDPOINT = this.API_URL ? `${this.API_URL}/api` : '/api';

  API = axios.create({
    baseURL: this.ENDPOINT,
  });

  getTodos = async () => {
    const { data } = await this.API.get<Todo[]>('/todos');
    return this.sortTodos(data);
  };

  addTodo = async (description: string) => {
    await this.API.post('/todos', {
      description,
      status: 'A fazer',
    });
    return this.getTodos();
  };

  updateTodo = async (todoId: Todo['_id'], update: Partial<Todo>) => {
    await this.API.put(`/todos/${todoId}`, {
      ...update,
    });
    return this.getTodos();
  };

  updateTodoStatus = async (todoId: Todo['_id'], status: Todo['status']) => {
    await this.API.patch(`/todos/${todoId}/status`, {
      status,
    });
    return this.getTodos();
  };

  deleteTodo = async (todoId: Todo['_id']) => {
    await this.API.delete(`/todos/${todoId}`);
    return this.getTodos();
  };
}
