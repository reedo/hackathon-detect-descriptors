import './App.css';
import DoodleArea from './components/DoodleArea/DoodleArea.component';
import { useState } from 'react';

function App() {
  const [mlGuesses, setMlGuesses] = useState([]);

  const onMlResultUpdated = (guesses: ClassificationResult[]) => {
    // TODO
  };

  return (
    <div className="App">
      <DoodleArea onUpdate={onMlResultUpdated} />
    </div>
  );
}

export default App;
