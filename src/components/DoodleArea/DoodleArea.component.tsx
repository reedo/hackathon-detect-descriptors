import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';

interface DoodleAreaProps {}

const DoodleArea: React.FC<DoodleAreaProps> = (props: DoodleAreaProps) => {
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {
    p5.strokeWeight(15);
    p5.stroke(0);

    // If mouse is pressed, draw line between previous and current mouse positions
    if (p5.mouseIsPressed) {
      p5.line(p5.pmouseX, p5.pmouseY, p5.mouseX, p5.mouseY);
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default DoodleArea;
