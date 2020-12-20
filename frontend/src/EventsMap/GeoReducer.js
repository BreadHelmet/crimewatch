import { GeoActions } from "./GeoActions";

export function geo(state={}, { type, geo }) {
  const { SET_GEO } = GeoActions;
  switch (type) {
    case SET_GEO:
      return geo;
    default:
      return state;
  }
}
