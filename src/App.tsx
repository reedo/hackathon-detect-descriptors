import './App.css';
import DoodleArea from './components/DoodleArea/DoodleArea.component';
import { useState } from 'react';
import { Tree } from './components/Tree';
import { data } from './components/Tree/sampledata';

function App() {
  const [mlGuesses, setMlGuesses] = useState<ClassificationResult[]>([]);

  const onMlResultUpdated = (guesses: ClassificationResult[]) => {
    setMlGuesses(guesses);
    console.log(guesses);
  };

  return (
    <div className="App">
      <DoodleArea onUpdate={onMlResultUpdated} />
      <div className="guess-info">
        <p>Guess: {mlGuesses.length > 0 ? mlGuesses[0].label : '...'}</p>
        <p>
          Confidence: {mlGuesses.length > 0 ? mlGuesses[0].confidence : '...'}
        </p>
      </div>
      <Tree data={data} />
    </div>
  );
}

export default App;
