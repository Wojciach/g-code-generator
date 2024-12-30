export class G_CODE_Generator {
  private matrix: MatrixOfHoles;
  private modalFunctions: string = 'G21 G17 G90 G94';
  // g21: set units to mm
  // g17: select XY plane
  // g90: absolute positioning
  // g94: feedrate in mm/min

  private startSpindle: string = 'M03 S10 F200';
  private stopSpindle: string = 'M05 S0 F0';
  private endProgram: string = 'M30';

  public generateFullG_CODE(): string {
    let gCode: string = '';
    gCode += `${this.modalFunctions}\n`;
    for (let hole of this.matrix.xyPositions) {
      gCode += this.genereateOneCircleFromCenter(hole, this.matrix.diameter);
    }
    gCode += `${this.endProgram}\n`;
    return gCode;
  }

  private genereateOneCircleFromCenter(center: number[], diameter: number): string {
    let gCode: string = '';
    let startPosition: number[] = [(center[0] - (diameter / 2)), center[1]];
    gCode += `G00 X${startPosition[0]} Y${startPosition[1]};\n`;
    gCode += `${this.startSpindle}\n`;
    gCode += `G02 X${startPosition[0]} Y${startPosition[1]} I${diameter / 2} J0;\n`;
    gCode += `${this.stopSpindle}\n`;

    return gCode;
  }

  constructor(matrix: MatrixOfHoles, spindleSpeed: number, feedRate: number) {
    this.matrix = matrix;
    this.startSpindle = `M03 S${spindleSpeed} F${feedRate}`;
    console.log('G_CODE constructor ran');
  }

};