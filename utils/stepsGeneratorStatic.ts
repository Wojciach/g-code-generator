type Position = {
  x: number
  y: number };

export class StepsGeneratorStatic {
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

  // public constructor(width: number, height: number, numberOfStepsHorizontal: number, numberOfStepsVertical: number, materialThickness: number) {
  //   this.reCalculate(width, height,  numberOfStepsHorizontal, numberOfStepsVertical, materialThickness);
  // }

  // public reCalculate(width: number, height: number, numberOfStepsHorizontal: number, numberOfStepsVertical: number, materialThickness: number ) {
  //   this.width = width;
  //   this.height = height;
  //   this.numberOfStepsHorizontal = numberOfStepsHorizontal;
  //   this.numberOfStepsVertical = numberOfStepsVertical;
  //   this.stepSizeHorizontal = width / numberOfStepsHorizontal;
  //   this.stepSizeVertical = height / numberOfStepsVertical;
  //   this.materialThickness = materialThickness;

  // }

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

    // Update this.currentPosition once at the end
    //currentPosition = { ...currentPosition }; // This is not needed because I want to affect original object
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

    // Update this.currentPosition once at the end
    //this.currentPosition = { ...currentPosition }; // This is not needed because I want to affect original object
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

    // Update this.currentPosition once at the end
    // this.currentPosition = { ...currentPosition }; // This is not needed because I want to affect original object
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

    // Update this.currentPosition once at the end
    // this.currentPosition = { ...currentPosition }; // This is not needed because I want to affect original object
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

    // Update this.currentPosition once at the end
    //this.currentPosition = { ...currentPosition }; // This is not needed because I want to affect original object
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

    // Update this.currentPosition once at the end
    // this.currentPosition = { ...currentPosition }; // This is not needed because I want to affect original object
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

    // Update this.currentPosition once at the end
    // this.currentPosition = { ...currentPosition }; // This is not needed because I want to affect original object
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

    // Update this.currentPosition once at the end
    //this.currentPosition = { ...currentPosition }; // This is not needed because I want to affect original object
    return result; 
  }
}