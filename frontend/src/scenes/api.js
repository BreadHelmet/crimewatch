import { HttpRequest } from 'api/HttpRequest';
import { ContentType } from 'api/contenttype';

export class Scenes {
  static endpoint = {
    root: '/scenes',
    for: id => `/scenes/${id}`,
  };

  static create(scene) {
    return HttpRequest.post(
      Scenes.endpoint.root,
      scene,
      ContentType.JSON);
  }

  static read(id) {
    if (id) {
      return HttpRequest.get(
        Scenes.endpoint.for(id));
    }
    return HttpRequest.get(
      Scenes.endpoint.root);
  }

  static update(scene) {
    return HttpRequest.put(
      Scenes.endpoint.root,
      scene,
      ContentType.JSON);
  }

  static delete(id) {
    return HttpRequest.delete(
      Scenes.endpoint.for(id));
  }
}
