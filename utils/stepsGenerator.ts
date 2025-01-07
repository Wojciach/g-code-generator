type Position = {
  x: number
  y: number };

export class StepsGenerator {
  public theString: string = '';
  public materialThickness: number = 1;
  public stepSize: number = 0.875;
  public numberOfSteps: number = 0;
  public divisor: number = 1;
  public startPosition: Position = { x: 0, y: 0 };
  public currentPosition: Position = { x: 0, y: 0 };
  public previousPosition: Position = { x: 0, y: 0 };

  public goXplusYzero = (): string => {
    const nextPosition = {x: (this.previousPosition.x + this.stepSize * 2), y: (this.previousPosition.y)}; 
    this.currentPosition = nextPosition;
    return `${this.previousPosition.x},${this.previousPosition.y  - this.materialThickness} 
            ${this.previousPosition.x + this.stepSize},${this.previousPosition.y  - this.materialThickness} 
            ${this.previousPosition.x + this.stepSize},${this.previousPosition.y }
            ${this.previousPosition.x + this.stepSize * 2 },${this.previousPosition.y }`; 
  };

  public makeCornerXplusYzero = (): string => {
    const nextPosition = {x: this.previousPosition.x, y: this.previousPosition.y + this.materialThickness * 2};
    this.currentPosition = nextPosition;
    return `${this.previousPosition.x},${this.previousPosition.y - this.materialThickness} 
            ${this.previousPosition.x + this.stepSize},${this.previousPosition.y - this.materialThickness} 
            ${this.previousPosition.x + this.stepSize},${this.previousPosition.y + this.materialThickness} 
            ${this.previousPosition.x},${this.previousPosition.y + this.materialThickness} 
            ${this.previousPosition.x},${this.previousPosition.y + this.materialThickness * 2}
            `;
  }
} 