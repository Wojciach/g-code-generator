import type { MatrixOfHoles } from "./matrixOfHoles";
import type { Coordinates } from "./types";

export function generateDXF(polygonCoordinates: Coordinates[], matrix?: MatrixOfHoles): string {
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
TABLE
2
LAYER
0
LAYER
2
0
70
0
62
7
6
CONTINUOUS
0
ENDTAB
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

  // Add rectangle (POLYLINE)
  dxfContent += `
0
POLYLINE
8
0
66
1
70
1`;
polygonCoordinates.forEach(vertex => {
    dxfContent += `
0
VERTEX
8
0
10
${vertex.x}
20
${vertex.y}
30
${vertex.z || 0.0}
`;
  });

dxfContent += `
0
SEQEND
0
`;

  // Add circles
  if(matrix) {
  matrix.xyPositions.forEach(hole => {
    dxfContent += `
      0
      CIRCLE
      8
      0
      10
      ${hole[0]}
      20
      ${hole[1]}
      30
      0.0
      40
      ${matrix.diameter / 2}
      `;
        });
}

  dxfContent += `
0
ENDSEC
0
SECTION
2
OBJECTS
0
ENDSEC
0
EOF
`;

  return dxfContent;
}