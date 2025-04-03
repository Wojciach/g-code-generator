import { polygonGenerator } from '@/utils/polygonGenerator';
import type { Dimensions} from '@/utils/types';

export function usePolygonsForOpenTop(numberOfSteps: Dimensions, stepSizes: Dimensions, materialThickness: number) {
    return {
      top: polygonGenerator.polygonPointsTopAndBottom(
        { horizontal: numberOfSteps.width, vertical: numberOfSteps.depth },
        { horizontal: stepSizes.width, vertical: stepSizes.depth },
        materialThickness
      ),
      bottom: polygonGenerator.polygonPointsTopAndBottom(
        { horizontal: numberOfSteps.width, vertical: numberOfSteps.depth },
        { horizontal: stepSizes.width, vertical: stepSizes.depth },
        materialThickness
      ),
      frontAndBack: polygonGenerator.polygonPointsFrontAndBack(
        { horizontal: numberOfSteps.width, vertical: numberOfSteps.height },
        { horizontal: stepSizes.width, vertical: stepSizes.height },
        materialThickness
      ),
      leftAndRight: polygonGenerator.polygonPointsLeftAndRight(
        { horizontal: numberOfSteps.height, vertical: numberOfSteps.depth },
        { horizontal: stepSizes.height, vertical: stepSizes.depth },
        materialThickness
      )
    };
}