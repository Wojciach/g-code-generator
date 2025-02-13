import { StepsGeneratorStatic } from './stepsGeneratorStatic';
export class polygonGenerator {
    public static polygonPointsTopAndBottom = (
            numberOfSteps:{ horizontal:number, vertical:number},
            stepSize:{ horizontal:number, vertical:number},
            materialThickness:number,
        ):string => {

        let points = '';
        //const numberOfStepsHorizontal = numberOfSteps.width;
       //const numberOfStepsVerticlal = numberOfSteps.depth;
        //stepsTopAndBottom.currentPosition = { x: materialThickness, y: materialThickness };
        const currentPosition = { x: materialThickness, y: materialThickness };
      
        points += `${currentPosition.x},${currentPosition.y} `;
        
        //top wall going right
        for(let i = 0; i < numberOfSteps.horizontal; i++) {
          points += `${StepsGeneratorStatic.goRightXplusYzero(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
        }
        //right wall going down
        for(let i = 0; i < numberOfSteps.vertical; i++) {
          points += `${StepsGeneratorStatic.goDownXzeroYminus(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
        }
        //bottom wall going left
        for(let i = 0; i < numberOfSteps.horizontal; i++) {
          points += `${StepsGeneratorStatic.goLeftXminusYzero(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
        }
        //left wall going up
        for(let i = 0; i < numberOfSteps.vertical; i++) {
          points += `${StepsGeneratorStatic.goUpXzeroYminus(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
        }
        return `${points}`;
    };

    public static polygonPointsFrontAndBack = (
        numberOfSteps:{ horizontal:number, vertical:number},
        stepSize:{ horizontal:number, vertical:number},
        materialThickness:number,
    ):string => {
        let points = '';
        // const numberOfStepsHorizontal = numberOfSteps.width;
        // const numberOfStepsVerticlal = numberOfSteps.height;
        const currentPosition = { x: materialThickness, y: materialThickness };
      
        points += `${currentPosition.x},${currentPosition.y} `;
        
        for(let i = 0; i < numberOfSteps.horizontal; i++) {
          points += `${StepsGeneratorStatic.goRightXplusYzero(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
        }
        for(let i = 0; i < numberOfSteps.vertical; i++) {
          points += `${StepsGeneratorStatic.goDownXzeroYminus(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
        }
        for(let i = 0; i < numberOfSteps.horizontal; i++) {
          points += `${StepsGeneratorStatic.goLeftXminusYzero(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
        }
        for(let i = 0; i < numberOfSteps.vertical; i++) {
          points += `${StepsGeneratorStatic.goUpXzeroYminus(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
        }
        return `${points}`;
    };

    public static polygonPointsLeftAndRight = (
        numberOfSteps:{ horizontal:number, vertical:number},
        stepSize:{ horizontal:number, vertical:number},
        materialThickness:number,
    ):string => {
        let points = '';
        // const numberOfStepsHorizontal = numberOfSteps.height;
        // const numberOfStepsVerticlal = numberOfSteps.depth;
        const currentPosition = { x: materialThickness, y: materialThickness };
      
        points += `${currentPosition.x},${currentPosition.y} `;
      
        points +=`${StepsGeneratorStatic.makeCornerXplusYplus(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
        for(let i = 0; i < (numberOfSteps.horizontal -1); i++) {
          points += `${StepsGeneratorStatic.goRightXplusYzero(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
        }
        
        points +=`${StepsGeneratorStatic.makeCornerXplusYminus(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
        for(let i = 0; i < (numberOfSteps.vertical -1); i++) {
          points += `${StepsGeneratorStatic.goDownXzeroYminus(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
        }
      
        points +=`${StepsGeneratorStatic.makeCornerXminusYplus(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
        for(let i = 0; i < (numberOfSteps.horizontal -1); i++) {
          points += `${StepsGeneratorStatic.goLeftXminusYzero(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
        }
      
        points +=`${StepsGeneratorStatic.makeCornerXminusYminus(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
        for(let i = 0; i < (numberOfSteps.vertical -1); i++) {
          points += `${StepsGeneratorStatic.goUpXzeroYminus(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
        }
        return `${points}`;
    };
}