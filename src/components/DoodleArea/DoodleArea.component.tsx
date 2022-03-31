import { useState } from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';
import './DoodleArea.styles.css';
// import p5 from 'p5';

interface DoodleAreaProps {}

const DoodleArea: React.FC<DoodleAreaProps> = (props: DoodleAreaProps) => {
  const [p5Instance, setP5Instance]: any = useState(null);

  // --------------------------------------------------
  // Canvas callbacks
  // --------------------------------------------------

  const setupCanvas = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);

    // set a reference to the instance of p5 so it can be used later
    // outside of the Sketch component.
    setP5Instance(p5);
  };

  const drawOnCanvas = (p5: p5Types) => {
    p5.strokeWeight(5);
    p5.stroke(0);

    // If mouse is pressed, draw line between previous and current mouse positions
    if (p5.mouseIsPressed) {
      p5.line(p5.pmouseX, p5.pmouseY, p5.mouseX, p5.mouseY);
    }
  };

  const clearCanvas = () => {
    p5Instance.background(255);
  };

  // --------------------------------------------------
  // Components
  // --------------------------------------------------

  const ClearButton = () => {
    return <button onClick={() => clearCanvas()}>Clear</button>;
  };

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <div className="doodle-area">
      <div className="canvas">
        <Sketch setup={setupCanvas} draw={drawOnCanvas} />
      </div>
      <div className="doodle-info">
        <ClearButton />
      </div>
    </div>
  );
};

export default DoodleArea;
