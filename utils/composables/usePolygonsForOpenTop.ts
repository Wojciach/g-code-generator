import { polygonGeneratorForOpenTop } from '@/utils/polygonGeneratorForOpenTop';
import type { Dimensions} from '@/utils/types';

export function usePolygonsForOpenTop(numberOfSteps: Dimensions, stepSizes: Dimensions, materialThickness: number) {

    const top = polygonGeneratorForOpenTop.polygonPointsTop(
      { horizontal: numberOfSteps.width, vertical: numberOfSteps.depth },
      { horizontal: stepSizes.width, vertical: stepSizes.depth },
      materialThickness
    );

    const bottom = polygonGeneratorForOpenTop.polygonPointsBottom(
      { horizontal: numberOfSteps.width, vertical: numberOfSteps.depth },
      { horizontal: stepSizes.width, vertical: stepSizes.depth },
      materialThickness
    );

    const leftAndRight = polygonGeneratorForOpenTop.polygonPointsRight(
      { horizontal: numberOfSteps.height, vertical: numberOfSteps.depth },
      { horizontal: stepSizes.height, vertical: stepSizes.depth },
      materialThickness
    );

    const left = polygonGeneratorForOpenTop.polygonPointsLeft(
      { horizontal: numberOfSteps.height, vertical: numberOfSteps.depth },
      { horizontal: stepSizes.height, vertical: stepSizes.depth },
      materialThickness
    );

    const front = polygonGeneratorForOpenTop.polygonPointsFront(
      { horizontal: numberOfSteps.width, vertical: numberOfSteps.height },
      { horizontal: stepSizes.width, vertical: stepSizes.height },
      materialThickness
    );

    const back = polygonGeneratorForOpenTop.polygonPointsBack(
      { horizontal: numberOfSteps.width, vertical: numberOfSteps.height },
      { horizontal: stepSizes.width, vertical: stepSizes.height },
      materialThickness
    );

    return {
      top: '',
      bottom: bottom,
      front: front,
      back: back,
      left: left,
      right: leftAndRight,
    };
}