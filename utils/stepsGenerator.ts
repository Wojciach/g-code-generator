import type { Position } from '@/utils/types';
export class StepsGenerator {
  public theString: string = '';
  public materialThickness!: number;
  public stepSizeHorizontal: number = 1;
  public stepSizeVertical: number = 1;
  public numberOfStepsHorizontal!: number;
  public numberOfStepsVertical!: number;
  public divisorWidth!: number;
  public divisorHeight!: number;
  public startPosition: Position = { x: 0, y: 0 };
  public currentPosition: Position = { x: 0, y: 0 };
  public previousPosition: Position = { x: 0, y: 0 };
  public width!: number;
  public height!: number;

  public constructor(width: number, height: number, numberOfStepsHorizontal: number, numberOfStepsVertical: number, materialThickness: number) {
    this.reCalculate(width, height,  numberOfStepsHorizontal, numberOfStepsVertical, materialThickness);
  }

  public reCalculate(width: number, height: number, numberOfStepsHorizontal: number, numberOfStepsVertical: number, materialThickness: number ) {
    this.width = width;
    this.height = height;
    this.numberOfStepsHorizontal = numberOfStepsHorizontal;
    this.numberOfStepsVertical = numberOfStepsVertical;
    this.stepSizeHorizontal = width / numberOfStepsHorizontal;
    this.stepSizeVertical = height / numberOfStepsVertical;
    this.materialThickness = materialThickness;

  }

  public goRightXplusYzero = (currentPosition: Position, stepSizeHorizontal: number, stepSizeVertical: number, materialThickness: number): string => {
    let result = '';
    this.stepSizeHorizontal = stepSizeHorizontal;
    this.stepSizeVertical = stepSizeVertical;
    this.materialThickness = materialThickness;

    // Move down by material thickness
    currentPosition.y -= this.materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move right by step size
    currentPosition.x += this.stepSizeHorizontal;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move up by material thickness
    currentPosition.y += this.materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move right by step size
    currentPosition.x += this.stepSizeHorizontal;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Update this.currentPosition once at the end
    this.currentPosition = { ...currentPosition };
    return result;
  };

  public goDownXzeroYminus = (currentPosition: Position, stepSizeHorizontal: number, stepSizeVertical: number, materialThickness: number): string => {
    let result = '';
    this.stepSizeHorizontal = stepSizeHorizontal;
    this.stepSizeVertical = stepSizeVertical;
    this.materialThickness = materialThickness;

    // Move right by material thickness
    currentPosition.x += this.materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move down by step size
    currentPosition.y += this.stepSizeVertical;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move left by material thickness
    currentPosition.x -= this.materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move down by step size
    currentPosition.y += this.stepSizeVertical;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Update this.currentPosition once at the end
    this.currentPosition = { ...currentPosition };
    return result;
  };

  public goLeftXminusYzero = (currentPosition: Position, stepSizeHorizontal: number, stepSizeVertical: number, materialThickness: number): string => {
    let result = '';
    this.stepSizeHorizontal = stepSizeHorizontal;
    this.stepSizeVertical = stepSizeVertical;
    this.materialThickness = materialThickness;

    // Move right by material thickness
    currentPosition.y += this.materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move down by step size
    currentPosition.x -= this.stepSizeHorizontal;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move left by material thickness
    currentPosition.y -= this.materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move down by step size
    currentPosition.x -= this.stepSizeHorizontal;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Update this.currentPosition once at the end
    this.currentPosition = { ...currentPosition };
    return result;
  };

  public goUpXzeroYminus = (currentPosition: Position, stepSizeHorizontal: number, stepSizeVertical: number, materialThickness: number): string => {
    let result = '';
    this.stepSizeHorizontal = stepSizeHorizontal;
    this.stepSizeVertical = stepSizeVertical;
    this.materialThickness = materialThickness;

    // Move left by material thickness
    currentPosition.x -= this.materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move up by step size
    currentPosition.y -= this.stepSizeVertical;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move right by material thickness
    currentPosition.x += this.materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move up by step size
    currentPosition.y -= this.stepSizeVertical;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Update this.currentPosition once at the end
    this.currentPosition = { ...currentPosition };
    return result;
  };

  public makeCornerXplusYplus = (currentPosition: Position, stepSizeHorizontal: number, stepSizeVertical: number, materialThickness: number): string => {
    let result = '';
    this.stepSizeHorizontal = stepSizeHorizontal;
    this.stepSizeVertical = stepSizeVertical;
    this.materialThickness = materialThickness;

    // Move left by material thickness
    currentPosition.x -= this.materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move up by step size
    currentPosition.y -= this.materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move right by material thickness
    currentPosition.x += this.materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move right by step size
    currentPosition.x += this.stepSizeHorizontal;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move down by material thickness 
    currentPosition.y += this.materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move right by step size
    currentPosition.x += this.stepSizeHorizontal;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Update this.currentPosition once at the end
    this.currentPosition = { ...currentPosition };
    return result;
  }

  public makeCornerXplusYminus = (currentPosition: Position, stepSizeHorizontal: number, stepSizeVertical: number, materialThickness: number): string => {
    let result = '';
    this.stepSizeHorizontal = stepSizeHorizontal;
    this.stepSizeVertical = stepSizeVertical;
    this.materialThickness = materialThickness;

    // Move top by material thickness
    currentPosition.y -= this.materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move right by material thickness
    currentPosition.x += this.materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move down by material thickness
    currentPosition.y += this.materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move down by step size
    currentPosition.y += this.stepSizeVertical;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move left by material thickness 
    currentPosition.x -= this.materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move down by step size
    currentPosition.y += this.stepSizeVertical;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Update this.currentPosition once at the end
    this.currentPosition = { ...currentPosition };
    return result;
  }

  public makeCornerXminusYplus = (currentPosition: Position, stepSizeHorizontal: number, stepSizeVertical: number, materialThickness: number): string => {
    let result = '';
    this.stepSizeHorizontal = stepSizeHorizontal;
    this.stepSizeVertical = stepSizeVertical;
    this.materialThickness = materialThickness;

    // Move right by material thickness
    currentPosition.x += this.materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move down by material thickness
    currentPosition.y += this.materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move left by material thickness
    currentPosition.x -= this.materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move left by step size
    currentPosition.x -= this.stepSizeHorizontal;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move top by material thickness 
    currentPosition.y -= this.materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move left by step size
    currentPosition.x -= this.stepSizeHorizontal;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Update this.currentPosition once at the end
    this.currentPosition = { ...currentPosition };
    return result;
  }

  public makeCornerXminusYminus = (currentPosition: Position, stepSizeHorizontal: number, stepSizeVertical: number, materialThickness: number): string => {
    let result = '';
    this.stepSizeHorizontal = stepSizeHorizontal;
    this.stepSizeVertical = stepSizeVertical;
    this.materialThickness = materialThickness;

    // Move down by material thickness
    currentPosition.y += this.materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move left by material thickness
    currentPosition.x -= this.materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move up by material thickness
    currentPosition.y -= this.materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move up by step size
    currentPosition.y -= this.stepSizeVertical;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move right by material thickness 
    currentPosition.x += this.materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move top by step size
    currentPosition.y -= this.stepSizeVertical;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Update this.currentPosition once at the end
    this.currentPosition = { ...currentPosition };
    return result;
  }
}