export type Todo = {
  _id: string,
  description: string,
  status: 'A fazer' | 'Em andamento' | 'Concluído! 🎉',
  createdAt: string,
}

export type TodosContextType = {
  todos: Todo[] | null,
  addTodo: (description: string) => void,
}

export type ChildrenProps = {
  children: ReactNode,
}
