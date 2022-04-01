import { Button } from '@mui/material';
import p5Types from 'p5';
import { useState } from 'react';
import Sketch from 'react-p5';
import './DoodleArea.styles.css';
// import customModel from '../../models/birds-doors-passengers.json';
const ml5 = require('ml5');

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 650;
const CANVAS_BG_COLOR = 255;
const CANVAS_PEN_WIDTH = 5;

/** The props that can be passed into the DoodleArea component. */
interface DoodleAreaProps {
  /** Callback to run when the image detection result is updated. */
  onUpdate: (guesses: ClassificationResult[]) => void;
}

const DoodleArea: React.FC<DoodleAreaProps> = ({ onUpdate }) => {
  // --------------------------------------------------
  // Canvas callbacks
  // --------------------------------------------------

  const canvasLoaded = () => {
    setIsLoading(false);
  };

  const setupCanvas = (p5: p5Types, canvasParentRef: Element) => {
    // Create and configure the canvas.
    const myCanvas = p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    myCanvas.parent(canvasParentRef);
    addBorderToCanvas(p5);
    setCanvas(myCanvas);

    // set a reference to the instance of p5 so it can be used later
    // outside of the Sketch component.
    setP5Instance(p5);
  };

  const drawOnCanvas = (p5: p5Types) => {
    p5.strokeWeight(CANVAS_PEN_WIDTH);
    p5.stroke(0);

    // If mouse is pressed, draw line between previous and current mouse positions.
    if (p5.mouseIsPressed) {
      p5.line(p5.pmouseX, p5.pmouseY, p5.mouseX, p5.mouseY);
    }
  };

  const clearCanvas = () => {
    p5Instance.background(CANVAS_BG_COLOR);
    addBorderToCanvas(p5Instance);
  };

  const addBorderToCanvas = (p5: p5Types) => {
    p5.strokeWeight(2);
    p5.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    p5.strokeWeight(CANVAS_PEN_WIDTH);
  };

  // --------------------------------------------------
  // ML callbacks
  // --------------------------------------------------

  /**
   * Takes the top 3 results and passes them into the `onUpdate` callback.
   */
  const classifyCanvas = () => {
    if (!isLoading) {
      classifier.classify(canvas, 3, gotResult);
    }
  };

  const gotResult = (error: Error, results: ClassificationResult[]) => {
    if (error) {
      console.error(error);
      return;
    }

    const guesses = results.map((guess) => {
      return {
        label: guess.label,
        confidence: p5Instance.nf(guess.confidence, 0, 2),
      };
    });

    // Pass the top 3 results into `onUpdate`.
    onUpdate(guesses);
  };

  // --------------------------------------------------
  // State
  // --------------------------------------------------

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [p5Instance, setP5Instance] = useState<any>(null);
  const [canvas, setCanvas] = useState<any>(null);
  const [classifier, _setClassifier] = useState<any>(
    ml5.imageClassifier('./models/model.json', canvasLoaded)
  );

  // --------------------------------------------------
  // Components
  // --------------------------------------------------

  const ClearButton = () => {
    return (
      <Button variant="outlined" onClick={clearCanvas}>
        Clear
      </Button>
    );
  };

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <div className="doodle-area">
      {isLoading ? (
        <div className="loading">LOADING</div>
      ) : (
        <>
          <div className="canvas">
            <Sketch
              setup={setupCanvas}
              draw={drawOnCanvas}
              mouseReleased={classifyCanvas}
            />
          </div>
          <div className="doodle-info">
            <ClearButton />
          </div>
        </>
      )}
    </div>
  );
};

export default DoodleArea;
