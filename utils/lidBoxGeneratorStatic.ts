import type { Position } from './types';
export class lidBoxGeneratorStatic {

  public static createLidHinge = (currentPosition: Position, stepSizeHorizontal: number, numberOfStepsHotizontal: number, materialThickness: number): string => {
    let result = '';

    // Move left by material thickness
    currentPosition.x -= materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move up by material 2x thickness
    currentPosition.y -= (materialThickness * 2);
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move right by material thickness
    currentPosition.x += materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move right by full width (without material thickness)
    currentPosition.x += (numberOfStepsHotizontal * stepSizeHorizontal * 2);
    console.log('the value to move x RIGHT: ' + (numberOfStepsHotizontal * stepSizeHorizontal * 2))
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move right by material thickness
    currentPosition.x += materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move down by material 2x thickness
    currentPosition.y += (materialThickness * 2);
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move left by material thickness
    currentPosition.x -= materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    return result;
  }

  public static fromBottomGoingUpOnLeftSide = (currentPosition: Position, numberOfStepsVertical: number, stepSizeVertical: number, materialThickness: number, stepSizeHorizontal: number): string => {
    let result = '';

    // Move down by material thickness
    currentPosition.y += materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;
    
    // Move left by material thickness 3 times
    currentPosition.x -= (materialThickness * 3);
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move up by full depth (without material thickness)
    currentPosition.y -= (numberOfStepsVertical * stepSizeVertical * 2);
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move up by material thickness 5 times
    currentPosition.y -= (materialThickness * 5);
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move right by material thickness 3 times
    currentPosition.x += (materialThickness * 3);
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;


    // Move down by material thickness 3 times
    currentPosition.y += (materialThickness * 3);
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // now we need to replace one step because the hinge is overlaping it. The overlaped step (notch) is going to be removed in creation of top wall.
    // Move right step size
    currentPosition.x += stepSizeHorizontal;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move down by material thickness
    currentPosition.y += materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move right step size
    currentPosition.x += stepSizeHorizontal;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;


    return result;
  }

  public static fromTopGoingDownOnRightSide = (currentPosition: Position, numberOfStepsVertical: number, stepSizeVertical: number, materialThickness: number, stepSizeHorizontal: number): string => {
    let result = '';

    // Move up by material 4x thickness
    currentPosition.y -= (materialThickness * 4);
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;
    
    // Move right by material thickness 3 times
    currentPosition.x += (materialThickness * 3);
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move down by material thickness 5 times
    currentPosition.y += (materialThickness * 5);
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move down by full depth (without material thickness)
    currentPosition.y += (numberOfStepsVertical * stepSizeVertical * 2);
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move left by material thickness 2 times
    currentPosition.x -= (materialThickness * 2);
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move up by material thickness
    currentPosition.y -= materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move left by material thickness
    currentPosition.x -= materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    return result;
  }

  public static fromRightToLeft = (currentPosition: Position, stepSizeHorizontal: number, numberOfStepsHotizontal: number, materialThickness: number): string => {
    let result = '';

    // Move right by material thickness
    // currentPosition.x += materialThickness;
    // result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move down by material thickness
    currentPosition.y += materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move left by material thickness
    // currentPosition.x -= materialThickness;
    // result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move left by full width (without material thickness)
    currentPosition.x -= (numberOfStepsHotizontal * stepSizeHorizontal * 2);
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move up by material thickness
    currentPosition.y -= materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    return result;
  };
}