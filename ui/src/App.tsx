import logo from './logo.svg';
import './App.css';
import Todos from './pages/Todos';
import { TodosProvider } from './context/TodosContext';

function App() {
  return (
    <TodosProvider>
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <h1>Ebytr ToDo</h1>
        </header>
        <Todos />
      </div>
    </TodosProvider>
  );
}

export default App;
