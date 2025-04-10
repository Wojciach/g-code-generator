import { polygonGenerator } from '@/utils/polygonGenerator';
import type { Dimensions} from '@/utils/types';

export function usePolygons(numberOfSteps: Dimensions, stepSizes: Dimensions, materialThickness: number) {

      const topAndBottom = polygonGenerator.polygonPointsTopAndBottom(
        { horizontal: numberOfSteps.width, vertical: numberOfSteps.depth },
        { horizontal: stepSizes.width, vertical: stepSizes.depth },
        materialThickness
      );

      const frontAndBack = polygonGenerator.polygonPointsFrontAndBack(
        { horizontal: numberOfSteps.width, vertical: numberOfSteps.height },
        { horizontal: stepSizes.width, vertical: stepSizes.height },
        materialThickness
      );

      const leftAndRight = polygonGenerator.polygonPointsLeftAndRight(
        { horizontal: numberOfSteps.height, vertical: numberOfSteps.depth },
        { horizontal: stepSizes.height, vertical: stepSizes.depth },
        materialThickness
      );

    return {
      top: topAndBottom,
      bottom: topAndBottom,
      front: frontAndBack,
      back: frontAndBack,
      left: leftAndRight,
      right: leftAndRight
    };
}