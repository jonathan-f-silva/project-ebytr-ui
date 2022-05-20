import { Todo } from '../@types/custom';

export const noTasksMessage = 'Sem tarefas. Adicione uma!';
export const todoMock: Todo = {
  _id: '1',
  description: 'Test todo',
  status: 'A fazer',
  createdAt: (new Date()).toISOString(),
};
