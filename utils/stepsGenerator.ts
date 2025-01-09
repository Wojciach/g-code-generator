type Position = {
  x: number
  y: number };

export class StepsGenerator {
  public theString: string = '';
  public materialThickness: number = 1;
  public stepSize!: number;
  public numberOfSteps!: number;
  public divisorWidth!: number;
  public divisorHeight!: number;
  public startPosition: Position = { x: 0, y: 0 };
  public currentPosition: Position = { x: 0, y: 0 };
  public previousPosition: Position = { x: 0, y: 0 };
  public width!: number;
  public height!: number;

  public constructor(width: number, height: number) {
    this.reCalculate(width, height);
  }

  public reCalculate(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.divisorWidth = (Math.ceil(width) % 2 === 0) ? Math.ceil(width) : Math.ceil(width) + 1;;
    this.divisorHeight = (Math.ceil(height) % 2 === 0) ? Math.ceil(height) : Math.ceil(height) + 1;
    this.stepSize = (Math.ceil(width) / this.divisorWidth);
    this.numberOfSteps = Math.ceil((width / this.stepSize) / 2);
    console.log('DIVIZOR WIDTH: ', this.divisorWidth);
    console.log('recalculate STEPS ran!');
  }

  public goRightXplusYzero = (currentPosition: Position): string => {
    let result = '';

    // Move down by material thickness
    currentPosition.y -= this.materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move right by step size
    currentPosition.x += this.stepSize;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move up by material thickness
    currentPosition.y += this.materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move right by step size
    currentPosition.x += this.stepSize;
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
    currentPosition.y += this.stepSize;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move left by material thickness
    currentPosition.x -= this.materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move down by step size
    currentPosition.y += this.stepSize;
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
    currentPosition.x -= this.stepSize;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move left by material thickness
    currentPosition.y -= this.materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move down by step size
    currentPosition.x -= this.stepSize;
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
    currentPosition.y -= this.stepSize;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move right by material thickness
    currentPosition.x += this.materialThickness;
    result += `${currentPosition.x},${currentPosition.y} `;

    // Move up by step size
    currentPosition.y -= this.stepSize;
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
            ${this.previousPosition.x + this.stepSize},${this.previousPosition.y - this.materialThickness} 
            ${this.previousPosition.x + this.stepSize},${this.previousPosition.y + this.materialThickness} 
            ${this.previousPosition.x},${this.previousPosition.y + this.materialThickness} 
            ${this.previousPosition.x},${this.previousPosition.y + this.materialThickness + this.stepSize} `;
  }
} 