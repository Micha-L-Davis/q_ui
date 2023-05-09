import './App.css';
import SystemViewer from './components/SystemViewer';
import systems from './data/systems.json'

function App() {


  return (
    <div className="App">
      <SystemViewer systems={systems} />
    </div>
  );
}

export default App;
