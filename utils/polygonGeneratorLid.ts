import { StepsGeneratorStatic } from './stepsGeneratorStatic';
import { lidBoxGeneratorStatic } from './lidBoxGeneratorStatic';
import { CornerGeneratorStatic } from './cornerGeneratorStatic';
import { FlatTopGeneratorStatic } from './flatTopGeneratorStatic';

export class polygonGeneratorLid {

    public static polygonPointsTop = (
            numberOfSteps:{ horizontal:number, vertical:number},
            stepSize:{ horizontal:number, vertical:number},
            materialThickness:number,
        ):string => {

        let points = '';
        const currentPosition = { x: materialThickness, y: (materialThickness * 2) };
      
        points += `${currentPosition.x},${currentPosition.y} `;
        
        //top wall going right
        points += `${lidBoxGeneratorStatic.createLidHinge(currentPosition, stepSize.horizontal, numberOfSteps.horizontal, materialThickness)}`;
       
        //right wall going down
        currentPosition.y += (numberOfSteps.vertical * stepSize.vertical * 2);
        points += `${currentPosition.x},${currentPosition.y} `;

        //bottom wall going left
        currentPosition.x -= (numberOfSteps.horizontal * stepSize.horizontal * 2);
        console.log('the value to move x: ' + (numberOfSteps.horizontal * stepSize.horizontal * 2))
        points += `${currentPosition.x},${currentPosition.y} `;
       
        //left wall going up
        currentPosition.y -= (numberOfSteps.vertical * stepSize.vertical * 2);
        points += `${currentPosition.x},${currentPosition.y} `;
        
        return `${points}`;
    };

    public static polygonPointsBottom = (
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

    // public static polygonPointsFront = (
    //     numberOfSteps:{ horizontal:number, vertical:number},
    //     stepSize:{ horizontal:number, vertical:number},
    //     materialThickness:number,
    // ):string => {
    //     let points = '';
    //     const currentPosition = { x: materialThickness, y: materialThickness };
      
    //     points += `${currentPosition.x},${currentPosition.y} `;

    //     //top wall going right
    //     points += `${FlatTopGeneratorStatic.fromLeftToRight(currentPosition, stepSize.horizontal, numberOfSteps.horizontal, materialThickness)}`;
        
    //     //right wall going down
    //     for(let i = 0; i < numberOfSteps.vertical; i++) {
    //       points += `${StepsGeneratorStatic.goDownXzeroYminus(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
    //     }

    //     //bottom wall going left
    //     for(let i = 0; i < numberOfSteps.horizontal; i++) {
    //       points += `${StepsGeneratorStatic.goLeftXminusYzero(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
    //     }

    //     //left wall going up
    //     for(let i = 0; i < numberOfSteps.vertical; i++) {
    //       points += `${StepsGeneratorStatic.goUpXzeroYminus(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
    //     }
    //     return `${points}`;
    // };

    public static polygonPointsBack = (
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
        points += `${FlatTopGeneratorStatic.fromRightToLeft(currentPosition, stepSize.horizontal, numberOfSteps.horizontal, materialThickness)}`;

        //left wall going up
        for(let i = 0; i < numberOfSteps.vertical; i++) {
          points += `${StepsGeneratorStatic.goUpXzeroYminus(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
        }
        return `${points}`;
    };

    public static polygonPointsRight = (
      numberOfSteps:{ horizontal:number, vertical:number},
      stepSize:{ horizontal:number, vertical:number},
      materialThickness:number,
  ):string => {
      let points = '';
      const currentPosition = { x: ((materialThickness * 3) + (stepSize.horizontal * 2) ), y: (materialThickness * 4) };
    
      points += `${currentPosition.x},${currentPosition.y} `;

      //top wall going right
      // points +=`${StepsGeneratorStatic.makeCornerXplusYplus(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
      for(let i = 0; i < (numberOfSteps.horizontal -1); i++) {
        points += `${StepsGeneratorStatic.goRightXplusYzero(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
      }
      
      //right wall going down
      points +=`${StepsGeneratorStatic.makeCornerXplusYminus(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
      for(let i = 0; i < (numberOfSteps.vertical -1); i++) {
        points += `${StepsGeneratorStatic.goDownXzeroYminus(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
      }

      //bottom wall going left
      points +=`${StepsGeneratorStatic.makeCornerXminusYplus(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
      for(let i = 0; i < (numberOfSteps.horizontal -1); i++) {
        points += `${StepsGeneratorStatic.goLeftXminusYzero(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
      }
      
      //left wall going up
      points +=`${lidBoxGeneratorStatic.fromBottomGoingUpOnLeftSide(currentPosition, stepSize.vertical, numberOfSteps.vertical, materialThickness, stepSize.horizontal)}`;

      return `${points}`;
  };

    public static polygonPointsLeft = (
      numberOfSteps:{ horizontal:number, vertical:number},
      stepSize:{ horizontal:number, vertical:number},
      materialThickness:number,
    ):string => {
      let points = '';
      const currentPosition = { x: materialThickness, y: materialThickness * 4 };
    
      points += `${currentPosition.x},${currentPosition.y} `;

      //top wall going right
      points +=`${StepsGeneratorStatic.makeCornerXplusYplus(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
      for(let i = 0; i < (numberOfSteps.horizontal -1); i++) {
        points += `${StepsGeneratorStatic.goRightXplusYzero(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
      }
      
      //right wall going down
      // points +=`${FlatTopGeneratorStatic.fromTopGoingDown(currentPosition, stepSize.vertical, numberOfSteps.vertical, materialThickness)}`;
      points +=`${lidBoxGeneratorStatic.fromTopGoingDownOnRightSide(currentPosition, numberOfSteps.vertical, stepSize.vertical, materialThickness, stepSize.horizontal)}`;


      //bottom wall going left
      for(let i = 0; i < (numberOfSteps.horizontal); i++) {
        points += `${StepsGeneratorStatic.goLeftXminusYzero(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
      }

      points +=`${StepsGeneratorStatic.makeCornerXminusYminus(currentPosition, stepSize.vertical, materialThickness)}`;
      for(let i = 0; i < (numberOfSteps.vertical -1); i++) {
        points += `${StepsGeneratorStatic.goUpXzeroYminus(currentPosition, stepSize.horizontal, stepSize.vertical, materialThickness)}`;
      }

      return `${points}`;
    };
}