import { polygonGeneratorForOpenTop } from '@/utils/polygonGeneratorForOpenTop';
import type { Dimensions} from '@/utils/types';

export function usePolygonsForOpenTop(numberOfSteps: Dimensions, stepSizes: Dimensions, materialThickness: number) {
    return {
      top: polygonGeneratorForOpenTop.polygonPointsTopAndBottom(
        { horizontal: numberOfSteps.width, vertical: numberOfSteps.depth },
        { horizontal: stepSizes.width, vertical: stepSizes.depth },
        materialThickness
      ),
      bottom: polygonGeneratorForOpenTop.polygonPointsTopAndBottom(
        { horizontal: numberOfSteps.width, vertical: numberOfSteps.depth },
        { horizontal: stepSizes.width, vertical: stepSizes.depth },
        materialThickness
      ),
      frontAndBack: polygonGeneratorForOpenTop.polygonPointsFrontAndBack(
        { horizontal: numberOfSteps.width, vertical: numberOfSteps.height },
        { horizontal: stepSizes.width, vertical: stepSizes.height },
        materialThickness
      ),
      leftAndRight: polygonGeneratorForOpenTop.polygonPointsLeftAndRight(
        { horizontal: numberOfSteps.height, vertical: numberOfSteps.depth },
        { horizontal: stepSizes.height, vertical: stepSizes.depth },
        materialThickness
      )
    };
}