export class GeoActions {
  static SET_GEO = 'SET_GEO';
  static setGeo(geo) {
    return {
      type: GeoActions.SET_GEO,
      geo,
    };
  }
}
