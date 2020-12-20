import { HttpRequest } from 'api/HttpRequest';
import { ContentType } from 'api/contenttype';

export class Props {
  static endpoint = {
    root: '/props',
    for: id => `/props/${id}`,
  };

  static create(prop) {
    return HttpRequest.post(
      Props.endpoint.root,
      prop,
      ContentType.JSON);
  }

  static read(id) {
    if (id) {
      return HttpRequest.get(
        Props.endpoint.for(id));
    }
    return HttpRequest.get(
      Props.endpoint.root);
  }

  static update(prop) {
    return HttpRequest.put(
      Props.endpoint.root,
      prop,
      ContentType.JSON);
  }

  static delete(id) {
    return HttpRequest.delete(
      Props.endpoint.for(id));
  }
}
