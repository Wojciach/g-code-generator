import { polygonGeneratorLid } from '@/utils/polygonGeneratorLid';
import { polygonGeneratorForOpenTop } from '@/utils/polygonGeneratorForOpenTop';
import type { Dimensions} from '@/utils/types';

export function usePolygonsLid(numberOfSteps: Dimensions, stepSizes: Dimensions, materialThickness: number) {

      const top = polygonGeneratorLid.polygonPointsTop(
        { horizontal: numberOfSteps.width, vertical: numberOfSteps.depth },
        { horizontal: stepSizes.width, vertical: stepSizes.depth },
        materialThickness
      );

      const bottom = polygonGenerator.polygonPointsTopAndBottom(
        { horizontal: numberOfSteps.width, vertical: numberOfSteps.depth },
        { horizontal: stepSizes.width, vertical: stepSizes.depth },
        materialThickness
      );

      const frontAndBack = polygonGeneratorForOpenTop.polygonPointsFront(
        { horizontal: numberOfSteps.width, vertical: numberOfSteps.height },
        { horizontal: stepSizes.width, vertical: stepSizes.height },
        materialThickness
      );

      const left = polygonGeneratorLid.polygonPointsLeft(
        { horizontal: numberOfSteps.height, vertical: numberOfSteps.depth },
        { horizontal: stepSizes.height, vertical: stepSizes.depth },
        materialThickness
      );

      const right = polygonGeneratorLid.polygonPointsRight(
        { horizontal: numberOfSteps.height, vertical: numberOfSteps.depth },
        { horizontal: stepSizes.height, vertical: stepSizes.depth },
        materialThickness
      );

    return {
      top: top,
      bottom: bottom,
      front: frontAndBack,
      back: frontAndBack,
      left: left,
      right: right
    };
}