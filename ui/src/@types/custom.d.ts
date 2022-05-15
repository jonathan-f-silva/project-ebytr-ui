export type Todo = {
  id: string,
  description: string,
  status: 'A fazer' | 'Em andamento' | 'Concluído! 🎉',
  createdAt: Date,
}

export type TodosContextType = {
  todos: Todo[],
  addTodo: (description: string) => void,
}

export type ChildrenProps = {
  children: ReactNode,
}
