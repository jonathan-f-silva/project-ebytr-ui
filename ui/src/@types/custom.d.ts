export type Todo = {
  _id: string,
  description: string,
  status: 'A fazer' | 'Em andamento' | 'Concluído! 🎉',
  createdAt: string,
}

export type TodoField = keyof Omit<Todo, '_id'>

export type ChildrenProps = {
  children: ReactNode,
}
