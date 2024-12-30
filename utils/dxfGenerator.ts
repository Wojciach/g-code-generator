import type { MatrixOfHoles } from "./matrixOfHoles";

export function generateDXF(props: MatrixOfHoles): string {
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
1
0
VERTEX
8
0
10
0.0
20
0.0
0
VERTEX
8
0
10
${props.width}
20
0.0
0
VERTEX
8
0
10
${props.width}
20
${props.height}
0
VERTEX
8
0
10
0.0
20
${props.height}
0
VERTEX
8
0
10
0.0
20
0.0
0
SEQEND
0
`;

  // Add circles
  props.xyPositions.forEach(hole => {
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
${props.diameter / 2}
`;
  });

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