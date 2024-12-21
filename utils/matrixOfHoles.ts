export class MatrixOfHoles {
    public holes: number;
    public rows: number;
    public diameter: number;
    public spacing: number;
    public xPositions: number[];
    public yPositions: number[];
    public width: number;
    public height: number;
  
    constructor(holes: number, rows: number, diameter: number, spacing: number) {
        this.holes = holes;
        this.rows = rows;
        this.diameter = diameter;
        this.spacing = spacing;
        this.xPositions = [];
        this.yPositions = [];
        this.width = ((diameter + spacing) * holes) - spacing;
        this.height = ((diameter + spacing) * rows) - spacing;

        this.reCalculate(holes, rows, diameter, spacing)
        console.log('constructor ran');
        console.log(this.xPositions);
    }

    public reCalculate(holes: number, rows: number, diameter: number, spacing: number) {
        this.holes = holes;
        this.rows = rows;
        this.diameter = diameter;
        this.spacing = spacing;
    
        // Reactive array update
        this.xPositions.splice(0, this.xPositions.length, ...Array.from({ length: holes }, (_, i) => i * (diameter + spacing) + diameter / 2));
        this.width = ((diameter + spacing) * holes) - spacing;
        this.height = ((diameter + spacing) * rows) - spacing;

        this.yPositions.splice(0, this.yPositions.length, ...Array.from({ length: rows }, (_, i) => i * (diameter + spacing) + diameter / 2));

        console.log('recalculate ran!')
        console.log(this.yPositions);
        console.log('that was Y possitions')
    }
}