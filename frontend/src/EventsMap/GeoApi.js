import { HttpRequest } from "api/HttpRequest";
import { sweden } from "geo/sweden";

export class GeoApi {
  static endpoint = {
    root: '/geo',
    for: id => `/geo/${id}`,
  };
  static read(id) {
    return new Promise(resolve => setTimeout(resolve, 2000, sweden));
    /* eslint-disable no-unreachable */
    if (id) {
      return HttpRequest.get(GeoApi.endpoint.for(id));
    }
    return HttpRequest.get(GeoApi.endpoint.root);
    /* eslint-disable no-unreachable */
  }
}
