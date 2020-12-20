import { HttpRequest } from 'api/HttpRequest';
import { ContentType } from 'api/contenttype';

export class Actors {
  static endpoint = {
    root: '/actors',
    for: id => `/actors/${id}`,
  };

  static create(actor) {
    return HttpRequest.post(
      Actors.endpoint.root,
      actor,
      ContentType.JSON);
  }

  static read(id) {
    if (id) {
      return HttpRequest.get(
        Actors.endpoint.for(id));
    }
    return HttpRequest.get(
      Actors.endpoint.root);
  }

  static update(actor) {
    return HttpRequest.put(
      Actors.endpoint.root,
      actor,
      ContentType.JSON);
  }

  static delete(id) {
    return HttpRequest.delete(
      Actors.endpoint.for(id));
  }
}
