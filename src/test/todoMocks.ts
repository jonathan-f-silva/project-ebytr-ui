import { Todo } from '../@types/custom';

export const noTasksMessage = 'Sem tarefas. Adicione uma!';
export const todoMock: Todo = {
  _id: '1',
  description: 'Test todo',
  status: 'A fazer',
  createdAt: (new Date('2020-05-24')).toISOString(),
};

export const todoMocks: Todo[] = [
  {
    _id: '1',
    description: 'Test todo',
    status: 'A fazer',
    createdAt: (new Date('2020-05-24')).toISOString(),
  },
  {
    _id: '2',
    description: 'In progress todo',
    status: 'Em andamento',
    createdAt: (new Date('2020-05-25')).toISOString(),
  },
  {
    _id: '3',
    description: 'Finished todo',
    status: 'Concluído! 🎉',
    createdAt: (new Date('2020-05-20')).toISOString(),
  },
];
