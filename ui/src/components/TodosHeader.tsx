import { useContext, useState } from 'react';
import { TodosContextType } from '../@types/custom';
import { TodosContext } from '../context/TodosContext';
import TEST_IDS from '../testIds';

export default function TodosHeader() {
  const { addTodo } = useContext(TodosContext) as TodosContextType;
  const [inputText, setInputText] = useState('');

  const sendTodo = () => {
    addTodo(inputText);
    setInputText('');
  };

  return (
    <div>
      <input
        data-testid={ TEST_IDS.todoInput }
        placeholder="Digite uma tarefa"
        onChange={ (e) => setInputText(e.target.value) }
        value={ inputText }
      />
      <button
        data-testid={ TEST_IDS.todoAddButton }
        type="button"
        onClick={ sendTodo }
        disabled={ inputText === '' }
      >
        Adicionar tarefa
      </button>
    </div>
  );
}
