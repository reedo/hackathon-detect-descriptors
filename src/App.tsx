import { Card, CardContent, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import './App.css';
import DoodleArea from './components/DoodleArea';
import { Tree } from './components/Tree';
import { data } from './components/Tree/sampledata';

function App() {
  const [mlGuesses, setMlGuesses] = useState<ClassificationResult[]>([]);

  const onMlResultUpdated = (guesses: ClassificationResult[]) => {
    setMlGuesses(guesses);
  };

  return (
    <div className="App">
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <DoodleArea onUpdate={onMlResultUpdated} />
        </Grid>
        <Grid item xs={3}>
          <Tree data={data} />
        </Grid>
        <Grid item xs={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" component="div">
                Guess: {mlGuesses.length > 0 ? mlGuesses[0].label : '...'}
              </Typography>
              <Typography variant="h5" component="div">
                Confidence:{' '}
                {mlGuesses.length > 0 ? mlGuesses[0].confidence : '...'}
              </Typography>
            </CardContent>
          </Card>
          <div className="guess-info">
            <p></p>
            <p></p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
