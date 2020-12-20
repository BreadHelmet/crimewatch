import { HttpRequest } from 'api/HttpRequest';
import { ContentType } from 'api/contenttype';

export class EventsApi {
  static endpoint = {
    root: '/events',
    for: id => `/events/${id}`,
  };

  static create(event) {
    return HttpRequest.post(
      EventsApi.endpoint.root,
      event,
      ContentType.JSON);
  }

  static read(id) {
    if (id) {
      return HttpRequest.get(
        EventsApi.endpoint.for(id));
    }
    return HttpRequest.get(
      EventsApi.endpoint.root);
  }

  static update(event) {
    return HttpRequest.put(
      EventsApi.endpoint.root,
      event,
      ContentType.JSON);
  }

  static delete(id) {
    return HttpRequest.delete(
      EventsApi.endpoint.for(id));
  }
}
