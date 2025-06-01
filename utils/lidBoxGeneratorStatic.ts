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
    currentPosition.x -= (materialThickness * 4);
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move up by full depth (without material thickness)
    currentPosition.y -= (numberOfStepsVertical * stepSizeVertical * 2);
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move up by material thickness 5 times
    currentPosition.y -= (materialThickness * 6);
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move right by material thickness 5 times (hook)
    //creating a hook (normaly material thickness is 3x but because of the hook it is x5)
    currentPosition.x += (materialThickness * 7);
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move down by material thickness 1 times
    //depth of the hook
    currentPosition.y += (materialThickness * 2);
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move left by material thickness 2 times (length of the hook)
    currentPosition.x -= (materialThickness * 2);
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move down by material thickness 2 times
    // normaly it would be 3x times but hook is 1x wide so it is 2x
    currentPosition.y += (materialThickness * 2);
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // now we need to replace one step because the hinge is overlaping it. The overlaped step (notch) is going to be removed in creation of top wall (in the sequecen when steps are created in the for loop there is -1 step because of this overlap).
    // Move right step size (minus material thickness because thickenign of the hook)
    currentPosition.x += (stepSizeHorizontal - materialThickness);
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move down by material thickness
    currentPosition.y += (materialThickness * 1);
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move right step size
    currentPosition.x += stepSizeHorizontal;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    return result;
  }

  public static fromTopGoingDownOnRightSide = (currentPosition: Position, numberOfStepsVertical: number, stepSizeVertical: number, materialThickness: number, stepSizeHorizontal: number): string => {
    let result = '';

    // Move up by material 3x thickness
    // without hook it would be 4x but because of the hook it is 3x
    // now is *1 because of makint the hoo thicker
    currentPosition.y -= (materialThickness * 3);
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move left by material thickness 2 times
    // this is hook length going left
    currentPosition.x -= (materialThickness * 2);
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move up by material thickness 1 times because hook width is 1x material thickness
    currentPosition.y -= (materialThickness * 2);
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move right by material thickness 2 times to go back to the original position (hook length) 
    currentPosition.x += (materialThickness * 3);
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;
    
    // Move right by material thickness 3 times
    currentPosition.x += (materialThickness * 4);
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move down by material thickness 5 times
    currentPosition.y += (materialThickness * 6);
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move down by full depth (without material thickness)
    currentPosition.y += (numberOfStepsVertical * stepSizeVertical * 2);
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move left by material thickness 2 times
    currentPosition.x -= (materialThickness * 3);
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

    // Move down by material thickness
    currentPosition.y += materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move left by full width (without material thickness) and minus material thickness because of making the hook thicker (we need more space for hinge)
    currentPosition.x -= ((numberOfStepsHotizontal * stepSizeHorizontal * 2));
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move up by material thickness (*2 because of the hook is thicker and notch in the left hinge wall is removed so we need make this one bigger by the same distance)
    currentPosition.y -= (materialThickness * 2);
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move left by material thickness to close the wall that has extra room for the hinge
    // currentPosition.x -= materialThickness;
    // result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    return result;
  };

  public static goUpXzeroYminus_modifiedForHinge = (currentPosition: Position, stepSizeHorizontal: number, stepSizeVertical: number, materialThickness: number): string => {
    let result = '';

    // Move left by material thickness
    currentPosition.x -= materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move up by step size
    currentPosition.y -= (stepSizeVertical - materialThickness); // Adjusted for hinge by shortening the step size by material thickness
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move right by material thickness
    currentPosition.x += materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move up by step size
    currentPosition.y -= stepSizeVertical;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    return result;
  };

  public static goRightXplusYzero_ModifiedForLid = (currentPosition: Position, stepSizeHorizontal: number, numberOfStepsHotizontal: number, materialThickness: number): string => {
    let result = '';

    // Move up by material thickness
    currentPosition.y -= materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move right by step size
    currentPosition.x += stepSizeHorizontal;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move down by material thickness
    currentPosition.y += materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move right by step size
    currentPosition.x += (stepSizeHorizontal - materialThickness);
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    return result;
  };
}