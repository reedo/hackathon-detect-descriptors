import './App.css';
import DoodleArea from './components/DoodleArea/DoodleArea.component';
import { useState } from 'react';
import {Tree} from "./components/Tree";
import {data} from "./components/Tree/sampledata";

function App() {
  const [mlGuesses, setMlGuesses] = useState([]);

  const onMlResultUpdated = (guesses: ClassificationResult[]) => {
    // TODO
  };

  return (
    <div className="App">
      <DoodleArea onUpdate={onMlResultUpdated} />
      <Tree data={data}/>
    </div>
  );
}

export default App;
