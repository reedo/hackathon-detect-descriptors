import { useState } from 'react';
import './App.css';
import DoodleArea from './components/DoodleArea';
import { Tree } from './components/Tree';
import { data } from './components/Tree/sampledata';
import { Grid } from '@mui/material';

function App() {
  const [mlGuesses, setMlGuesses] = useState<ClassificationResult[]>([]);

  const onMlResultUpdated = (guesses: ClassificationResult[]) => {
    setMlGuesses(guesses);
  };

  return (
    <div className="App">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <DoodleArea onUpdate={onMlResultUpdated} />
        </Grid>
        <Grid item xs={4}>
          <Tree data={data} />
        </Grid>
        <Grid item xs={6}>
          <div className="guess-info">
            <p>Guess: {mlGuesses.length > 0 ? mlGuesses[0].label : '...'}</p>
            <p>
              Confidence:{' '}
              {mlGuesses.length > 0 ? mlGuesses[0].confidence : '...'}
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
