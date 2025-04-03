import type { Position } from './types';
export class StepsGeneratorStatic {

  public static goRightXplusYzero = (currentPosition: Position, stepSizeHorizontal: number, stepSizeVertical: number, materialThickness: number): string => {
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
    currentPosition.x += stepSizeHorizontal;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    return result;
  };

  public static goDownXzeroYminus = (currentPosition: Position, stepSizeHorizontal: number, stepSizeVertical: number, materialThickness: number): string => {
    let result = '';

    // Move right by material thickness
    currentPosition.x += materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move down by step size
    currentPosition.y += stepSizeVertical;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move left by material thickness
    currentPosition.x -= materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move down by step size
    currentPosition.y += stepSizeVertical;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    return result;
  };

  public static goLeftXminusYzero = (currentPosition: Position, stepSizeHorizontal: number, stepSizeVertical: number, materialThickness: number): string => {
    let result = '';

    // Move down by material thickness
    currentPosition.y += materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move left by step size
    currentPosition.x -= stepSizeHorizontal;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move up by material thickness
    currentPosition.y -= materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move left by step size
    currentPosition.x -= stepSizeHorizontal;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    return result;
  };

  public static goUpXzeroYminus = (currentPosition: Position, stepSizeHorizontal: number, stepSizeVertical: number, materialThickness: number): string => {
    let result = '';

    // Move left by material thickness
    currentPosition.x -= materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move up by step size
    currentPosition.y -= stepSizeVertical;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move right by material thickness
    currentPosition.x += materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move up by step size
    currentPosition.y -= stepSizeVertical;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    return result;
  };

  public static makeCornerXplusYplus = (currentPosition: Position, stepSizeHorizontal: number, stepSizeVertical: number, materialThickness: number): string => {
    let result = '';

    // Move left by material thickness
    currentPosition.x -= materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move up by material thickness
    currentPosition.y -= materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move right by material thickness
    currentPosition.x += materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move right by step size
    currentPosition.x += stepSizeHorizontal;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move down by material thickness 
    currentPosition.y += materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move right by step size
    currentPosition.x += stepSizeHorizontal;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    return result;
  }

  //this spuposed to be called XplusYplus because it is moving down and SVG Y axis is pointing down
  public static makeCornerXplusYminus = (currentPosition: Position, stepSizeHorizontal: number, stepSizeVertical: number, materialThickness: number): string => {
    let result = '';

    // Move up by material thickness
    currentPosition.y -= materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move right by material thickness
    currentPosition.x += materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move down by material thickness
    currentPosition.y += materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move down by step size
    currentPosition.y += stepSizeVertical;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move left by material thickness 
    currentPosition.x -= materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move down by step size
    currentPosition.y += stepSizeVertical;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    return result;
  }

  public static makeCornerXminusYplus = (currentPosition: Position, stepSizeHorizontal: number, stepSizeVertical: number, materialThickness: number): string => {
    let result = '';

    // Move right by material thickness
    currentPosition.x += materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move down by material thickness
    currentPosition.y += materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move left by material thickness
    currentPosition.x -= materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move left by step size
    currentPosition.x -= stepSizeHorizontal;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move up by material thickness 
    currentPosition.y -= materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move left by step size
    currentPosition.x -= stepSizeHorizontal;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    return result;
  }

  public static makeCornerXminusYminus = (currentPosition: Position, stepSizeHorizontal: number, stepSizeVertical: number, materialThickness: number): string => {
    let result = '';

    // Move down by material thickness
    currentPosition.y += materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move left by material thickness
    currentPosition.x -= materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move up by material thickness
    currentPosition.y -= materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move up by step size
    currentPosition.y -= stepSizeVertical;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move right by material thickness 
    currentPosition.x += materialThickness;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    // Move top by step size
    currentPosition.y -= stepSizeVertical;
    result += `${currentPosition.x.toFixed(1)},${currentPosition.y.toFixed(1)} `;

    return result; 
  }
}