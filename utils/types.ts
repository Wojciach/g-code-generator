export type Position = {
  x: number
  y: number };

export type Dimensions = {
  width: number;
  height: number;
  depth: number;
};



export type PolygonsOriginal = {
  top: string;
  bottom: string;
  front: string;
  back: string;
  left: string;
  right: string;
  topAndBottom: string;
  frontAndBack: string;
  leftAndRight: string;
}
export type Polygons = Partial<PolygonsOriginal>;

export type Coordinates = {
  x: number;
  y: number;
  z?: number;
};