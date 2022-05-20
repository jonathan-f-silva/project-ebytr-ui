export type Todo = {
  _id: string,
  description: string,
  status: 'A fazer' | 'Em andamento' | 'Concluído! 🎉',
  createdAt: string,
}

export type ChildrenProps = {
  children: ReactNode,
}

export const TODO_STATUSES = ['A fazer', 'Em andamento', 'Concluído! 🎉'];
