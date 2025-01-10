type Position = {
  x: number
  y: number };

export class StepsGenerator {
  public theString: string = '';
  public materialThickness: number = 1;
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

  public constructor(width: number, height: number, numbnerOfStepsHorizontal?: number, numberOfStepsVertical?: number) {
    this.reCalculate(width, height,  numbnerOfStepsHorizontal, numberOfStepsVertical);
  }

  public reCalculate(width: number, height: number, numberOfStepsHorizontal?: number, numberOfStepsVertical?: number) {
    this.width = width;
    this.height = height;
    this.divisorWidth = (Math.ceil(width) % 2 === 0) ? Math.ceil(width) : Math.ceil(width) + 1;
    this.divisorHeight = (Math.ceil(height) % 2 === 0) ? Math.ceil(height) : Math.ceil(height) + 1;

    if (numberOfStepsHorizontal) {
      this.numberOfStepsHorizontal = numberOfStepsHorizontal;
      this.stepSizeHorizontal = (Math.ceil(width) / numberOfStepsHorizontal) / 2;
      console.log("NUMBER OF STEPS HORZONTAL IS: ", numberOfStepsHorizontal);
    } else {
      this.numberOfStepsHorizontal = Math.ceil((width / this.stepSizeHorizontal) / 2);
      this.stepSizeHorizontal = (Math.ceil(width) / this.divisorWidth);
    }

    if (numberOfStepsVertical) {
      this.numberOfStepsVertical = numberOfStepsVertical;
      this.stepSizeVertical = (Math.ceil(height) / numberOfStepsVertical) / 2;
      console.log("NUMBER OF STEPS VERTICAL IS: ", numberOfStepsVertical);
    } else {
      this.numberOfStepsVertical = Math.ceil((height / this.stepSizeVertical) / 2);
      this.stepSizeVertical = (Math.ceil(height) / this.divisorHeight);
    }

    //this.stepSize = (Math.ceil(width) / this.divisorWidth);
    //this.stepSize = (Math.ceil(width) / this.divisorWidth);
    console.log('DIVIZOR WIDTH: ', this.divisorWidth);
    console.log('recalculate STEPS ran!');
  }

  public goRightXplusYzero = (currentPosition: Position): string => {
    let result = '';

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

    console.log('STRING: ' + result);
    console.log('CURRENT POSITION: ' + currentPosition.x + ' ' + currentPosition.y);
    return result;
  };

  public goDownXzeroYminus = (currentPosition: Position): string => {
    let result = '';

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

    console.log('STRING: ' + result);
    console.log('CURRENT POSITION: ' + currentPosition.x + ' ' + currentPosition.y);
    return result;
  };

  public goLeftXminusYzero = (currentPosition: Position): string => {
    let result = '';

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

    console.log('STRING: ' + result);
    console.log('CURRENT POSITION: ' + currentPosition.x + ' ' + currentPosition.y);
    return result;
  };

  public goUpXzeroYminus = (currentPosition: Position): string => {
    let result = '';

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

    console.log('STRING: ' + result);
    console.log('CURRENT POSITION: ' + currentPosition.x + ' ' + currentPosition.y);
    return result;
  };

  public makeCornerXplusYminus = (currentPosition: Position): string => {
    this.previousPosition = currentPosition;
    this.currentPosition = {x: this.previousPosition.x, y: this.previousPosition.y + this.materialThickness * 2};
    return `${this.previousPosition.x},${this.previousPosition.y - this.materialThickness} 
            ${this.previousPosition.x + this.stepSizeHorizontal},${this.previousPosition.y - this.materialThickness} 
            ${this.previousPosition.x + this.stepSizeHorizontal},${this.previousPosition.y + this.materialThickness} 
            ${this.previousPosition.x},${this.previousPosition.y + this.materialThickness} 
            ${this.previousPosition.x},${this.previousPosition.y + this.materialThickness + this.stepSizeHorizontal} `;
  }
} 