import type { Position } from './types';
export class StepsGeneratorStatic {

  public static goRightXplusYzero = (currentPosition: Position, stepSizeHorizontal: number, stepSizeVertical: number, materialThickness: number): string => {
    let result = '';

    // Move down by material thickness
    currentPosition.y -= materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move right by step size
    currentPosition.x += stepSizeHorizontal;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move up by material thickness
    currentPosition.y += materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move right by step size
    currentPosition.x += stepSizeHorizontal;
    result += `${currentPosition.x},${currentPosition.y} `;

    return result;
  };

  public static goDownXzeroYminus = (currentPosition: Position, stepSizeHorizontal: number, stepSizeVertical: number, materialThickness: number): string => {
    let result = '';

    // Move right by material thickness
    currentPosition.x += materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move down by step size
    currentPosition.y += stepSizeVertical;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move left by material thickness
    currentPosition.x -= materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move down by step size
    currentPosition.y += stepSizeVertical;
    result += `${currentPosition.x},${currentPosition.y} `;

    return result;
  };

  public static goLeftXminusYzero = (currentPosition: Position, stepSizeHorizontal: number, stepSizeVertical: number, materialThickness: number): string => {
    let result = '';

    // Move right by material thickness
    currentPosition.y += materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move down by step size
    currentPosition.x -= stepSizeHorizontal;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move left by material thickness
    currentPosition.y -= materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move down by step size
    currentPosition.x -= stepSizeHorizontal;
    result += `${currentPosition.x},${currentPosition.y} `;

    return result;
  };

  public static goUpXzeroYminus = (currentPosition: Position, stepSizeHorizontal: number, stepSizeVertical: number, materialThickness: number): string => {
    let result = '';

    // Move left by material thickness
    currentPosition.x -= materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move up by step size
    currentPosition.y -= stepSizeVertical;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move right by material thickness
    currentPosition.x += materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move up by step size
    currentPosition.y -= stepSizeVertical;
    result += `${currentPosition.x},${currentPosition.y} `;

    return result;
  };

  public static makeCornerXplusYplus = (currentPosition: Position, stepSizeHorizontal: number, stepSizeVertical: number, materialThickness: number): string => {
    let result = '';

    // Move left by material thickness
    currentPosition.x -= materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move up by step size
    currentPosition.y -= materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move right by material thickness
    currentPosition.x += materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move right by step size
    currentPosition.x += stepSizeHorizontal;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move down by material thickness 
    currentPosition.y += materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move right by step size
    currentPosition.x += stepSizeHorizontal;
    result += `${currentPosition.x},${currentPosition.y} `;

    return result;
  }

  public static makeCornerXplusYminus = (currentPosition: Position, stepSizeHorizontal: number, stepSizeVertical: number, materialThickness: number): string => {
    let result = '';

    // Move top by material thickness
    currentPosition.y -= materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move right by material thickness
    currentPosition.x += materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move down by material thickness
    currentPosition.y += materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move down by step size
    currentPosition.y += stepSizeVertical;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move left by material thickness 
    currentPosition.x -= materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move down by step size
    currentPosition.y += stepSizeVertical;
    result += `${currentPosition.x},${currentPosition.y} `;

    return result;
  }

  public static makeCornerXminusYplus = (currentPosition: Position, stepSizeHorizontal: number, stepSizeVertical: number, materialThickness: number): string => {
    let result = '';

    // Move right by material thickness
    currentPosition.x += materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move down by material thickness
    currentPosition.y += materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move left by material thickness
    currentPosition.x -= materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move left by step size
    currentPosition.x -= stepSizeHorizontal;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move top by material thickness 
    currentPosition.y -= materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move left by step size
    currentPosition.x -= stepSizeHorizontal;
    result += `${currentPosition.x},${currentPosition.y} `;

    return result;
  }

  public static makeCornerXminusYminus = (currentPosition: Position, stepSizeHorizontal: number, stepSizeVertical: number, materialThickness: number): string => {
    let result = '';

    // Move down by material thickness
    currentPosition.y += materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move left by material thickness
    currentPosition.x -= materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move up by material thickness
    currentPosition.y -= materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move up by step size
    currentPosition.y -= stepSizeVertical;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move right by material thickness 
    currentPosition.x += materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move top by step size
    currentPosition.y -= stepSizeVertical;
    result += `${currentPosition.x},${currentPosition.y} `;

    return result; 
  }
}