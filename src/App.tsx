import './App.css';
import DoodleArea from './components/DoodleArea/DoodleArea.component';
import { useState } from 'react';

function App() {
  const [mlGuesses, setMlGuesses] = useState<ClassificationResult[]>([]);

  const onMlResultUpdated = (guesses: ClassificationResult[]) => {
    setMlGuesses(guesses);
    console.log(guesses);
  };

  return (
    <div className="App">
      <DoodleArea onUpdate={onMlResultUpdated} />
    </div>
  );
}

export default App;
