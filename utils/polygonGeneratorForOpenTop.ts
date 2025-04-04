import { StepsGeneratorStatic } from './stepsGeneratorStatic';
import { CornerGeneratorStatic } from './cornerGeneratorStatic';
import { FlatTopGeneratorStatic } from './flatTopGeneratorStatic';

export class polygonGeneratorForOpenTop {
    public static polygonPointsTopAndBottom = (
            numberOfSteps:{ horizontal:number, vertical:number},
            stepSize:{ horizontal:number, vertical:number},
            materialThickness:number,
        ):string => {

        let points = '';
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
        const currentPosition = { x: materialThickness, y: materialThickness };
      
        points += `${currentPosition.x},${currentPosition.y} `;
        
        
        points += `${FlatTopGeneratorStatic.fromLeftToRight(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness, numberOfSteps.horizontal)}`;
        
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
        const currentPosition = { x: materialThickness, y: materialThickness };
      
        points += `${currentPosition.x},${currentPosition.y} `;
      
        points +=`${CornerGeneratorStatic.makeCornerXplusYplus(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
        for(let i = 0; i < (numberOfSteps.horizontal -1); i++) {
          points += `${StepsGeneratorStatic.goRightXplusYzero(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
        }
        
        points +=`${CornerGeneratorStatic.makeCornerXplusYminus(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
        for(let i = 0; i < (numberOfSteps.vertical -1); i++) {
          points += `${StepsGeneratorStatic.goDownXzeroYminus(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
        }
      
        points +=`${CornerGeneratorStatic.makeCornerXminusYplus(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
        for(let i = 0; i < (numberOfSteps.horizontal -1); i++) {
          points += `${StepsGeneratorStatic.goLeftXminusYzero(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
        }
      
        points +=`${CornerGeneratorStatic.makeCornerXminusYminus(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
        for(let i = 0; i < (numberOfSteps.vertical -1); i++) {
          points += `${StepsGeneratorStatic.goUpXzeroYminus(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
        }
        return `${points}`;
    };
}