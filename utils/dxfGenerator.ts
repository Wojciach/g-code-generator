interface DXFProperties {
  width: number;
  height: number;
  numHoles: number;
  holeDiameter: number;
  numRows: number;
  spacingX: number;
  spacingY: number;
  marginX: number;
  marginY: number;
}

export function generateDXF(props: DXFProperties): string {
  const { width, height, numHoles, holeDiameter, numRows, spacingX, spacingY, marginX, marginY } = props;
  const numCols = Math.ceil(numHoles / numRows);
  const holes = [];

  // Calculate the starting position
  const startX = marginX + holeDiameter / 2;
  const startY = marginY + holeDiameter / 2;

  // Generate holes positions
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const x = startX + col * spacingX;
      const y = startY + row * spacingY;
      if (holes.length < numHoles) {
        holes.push({ x, y });
      }
    }
  }

  // Generate DXF content
  let dxfContent = `
0
SECTION
2
HEADER
0
ENDSEC
0
SECTION
2
TABLES
0
ENDSEC
0
SECTION
2
BLOCKS
0
ENDSEC
0
SECTION
2
ENTITIES
`;

  // Add rectangle (LWPOLYLINE)
  dxfContent += `
0
LWPOLYLINE
8
0
90
4
70
1
10
0.0
20
0.0
10
${width}
20
0.0
10
${width}
20
${height}
10
0.0
20
${height}
`;

  // Add circles
  holes.forEach(hole => {
    dxfContent += `
0
CIRCLE
8
0
10
${hole.x}
20
${hole.y}
30
0.0
40
${holeDiameter / 2}
`;
  });

  // End of ENTITIES section
  dxfContent += `
0
ENDSEC
0
EOF
`;

  return dxfContent;
}