import { Card, CardContent, Grid, Typography } from '@mui/material';
import {useMemo, useState} from 'react';
import './App.css';
import DoodleArea from './components/DoodleArea';
import { Tree } from './components/Tree';
import { data } from './components/Tree/sampledata';

function App() {
  const [mlGuesses, setMlGuesses] = useState<ClassificationResult[]>([]);

  const onMlResultUpdated = (guesses: ClassificationResult[]) => {
    setMlGuesses(guesses);
  };

  const searchTerms = useMemo(() => {
    return mlGuesses.map((guess) => guess.label).join(",");
  }, [mlGuesses]);

  return (
    <div className="App">
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <DoodleArea onUpdate={onMlResultUpdated} />
        </Grid>
        <Grid item xs={3}>
          <Tree data={data} searchTerm={searchTerms} />
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
