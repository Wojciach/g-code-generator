export class MatrixOfHoles {
    public xMargin: number = 0;
    public yMargin: number = 0;
    public xPositions: number[] = [];
    public yPositions: number[] = [];
    public xyPositions: number[][] = [];
    public width: number = 0;
    public height: number = 0;
    public holes: number = 0;
    public rows: number = 0;
    public diameter: number = 0;
    public xSpacing: number = 0;
    public ySpacing: number = 0;

    constructor(holes: number, rows: number, diameter: number, xSpacing: number, ySpacing: number, xMargin: number, yMargin: number) {
        this.initialize(holes, rows, diameter, xSpacing, ySpacing, xMargin, yMargin);
        console.log('constructor ran');
        console.log(this.xPositions);
    }
  
    private initialize(holes: number, rows: number, diameter: number, xSpacing: number, ySpacing: number, xMargin: number, yMargin: number) {
        this.holes = holes;
        this.rows = rows;
        this.diameter = diameter;
        this.xSpacing = xSpacing;
        this.ySpacing = ySpacing;
        this.xMargin = xMargin;
        this.yMargin = yMargin;
        this.xPositions = [];
        this.yPositions = [];
        this.xyPositions = [];
        this.calculateDimensions();
        this.calculatePositions();
    }

    private calculateDimensions() {
        this.width = ((this.diameter + this.xSpacing) * this.holes) - this.xSpacing + (this.xMargin * 2);
        this.height = ((this.diameter + this.ySpacing) * this.rows) - this.ySpacing + (this.yMargin * 2);
    }

    private calculatePositions() {

        this.xPositions.splice(0, this.xPositions.length, ...Array.from({ length: this.holes }, (_, i) => this.xMargin + i * (this.diameter + this.xSpacing) + this.diameter / 2));
        this.yPositions.splice(0, this.yPositions.length, ...Array.from({ length: this.rows }, (_, i) => this.yMargin + i * (this.diameter + this.ySpacing) + this.diameter / 2));
    
        this.xyPositions = [];
        for (let y of this.yPositions) {
            for (let x of this.xPositions) {
                this.xyPositions.push([
                    parseFloat(x.toFixed(3)), // Round to 3 decimal places
                    parseFloat(y.toFixed(3))  // Round to 3 decimal places
                ]);
            }
        }
    }

    public reCalculate(holes: number, rows: number, diameter: number, xSpacing: number, ySpacing: number, xMargin: number, yMargin: number) {
        this.initialize(holes, rows, diameter, xSpacing, ySpacing, xMargin, yMargin);
        console.log('recalculate ran!');
        console.log(this.yPositions);
        console.log('that was Y positions');
        console.log(this.xPositions);
        console.log('that was X positions');
    }
}