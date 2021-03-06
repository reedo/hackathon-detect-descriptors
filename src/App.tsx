import { Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./App.css";
import DoodleArea from "./components/DoodleArea";
import NavBar from "./components/NavBar";
import { Tree } from "./components/Tree";
import { data } from "./components/Tree/sampledata";

function App() {
  const [mlGuesses, setMlGuesses] = useState<ClassificationResult[]>([]);

  const [searchTerm, setSearchTerm] = useState<string>();

  const [searchOverride, setSearchOverride] = useState<boolean>(false);

  const onMlResultUpdated = (guesses: ClassificationResult[]) => {
    setMlGuesses(guesses);
  };

  useEffect(() => {
    if (!searchOverride) {
      if (mlGuesses && mlGuesses.length > 0) {
        setSearchTerm(mlGuesses[0].label);
      } else {
        setSearchTerm(undefined);
      }
    }
  }, [mlGuesses, searchOverride]);

  return (
    <div className="App">
      <NavBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchOverride={searchOverride}
        setSearchOverride={setSearchOverride}
      />
      <div style={{ paddingTop: 50 }}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <DoodleArea onUpdate={onMlResultUpdated} />
          </Grid>
          <Grid item xs={3}>
            <Tree data={data} searchTerm={searchTerm} />
          </Grid>
          <Grid
            item
            xs={9}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Card variant="outlined">
              <CardContent sx={{ backgroundColor: "#fff" }}>
                <Typography variant="h5" component="div">
                  Guess: {mlGuesses.length > 0 ? mlGuesses[0].label : "..."}
                </Typography>
                <Typography variant="h5" component="div">
                  Confidence:{" "}
                  {mlGuesses.length > 0 ? mlGuesses[0].confidence : "..."}
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
    </div>
  );
}

export default App;
