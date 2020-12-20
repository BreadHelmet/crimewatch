import { ContentType } from 'api/contenttype';
import { apiPath } from 'api/variables';
import { logOut } from 'components/Login/logout';

export class HttpRequest {
  static POST = 'POST';
  static GET = 'GET';
  static PUT = 'PUT';
  static DELETE = 'DELETE';

  static handleError(response) {
    // TODO: handle other errors than 401
    switch (response.status) {
      case 401:
      case 422:
        logOut();
        break;
      default:
        break;
    }
  }

  static handleResponse(response) {
    // TODO: clean up this function
    if (response.ok) return response.json();
    if (response.status >= 400) {
      HttpRequest.handleError(response);
    }
    return response.json();
  }

  static formatPayload(payload, contentType) {
    // TODO: why would I need url encoded ?
    switch (contentType) {
      case ContentType.JSON:
        return JSON.stringify(payload);
      case ContentType.ENCODED:
        const urlEncoded = new URLSearchParams();
        Object.entries(payload).forEach(([name, value]) => urlEncoded.append(name, value.toString()));
        return urlEncoded.toString();
      default:
        throw new Error(`Invalid content type: ${contentType}`);
    }
  }

  static request(method, url, payload, contentType) {
    const headers = new Headers({
      'Content-Type': contentType,
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`});
    const body = payload ? HttpRequest.formatPayload(payload, contentType) : null;
    const init = { method, headers, body };
    const request = new Request(`${apiPath}${url}`, init);
    return fetch(request).then(HttpRequest.handleResponse);
  }

  static post(url, payload, contentType) {
    return HttpRequest.request(HttpRequest.POST, url, payload, contentType);
  }

  static get(url) {
    return HttpRequest.request(HttpRequest.GET, url);
  }

  static put(url, payload, contentType) {
    return HttpRequest.request(HttpRequest.PUT, url, payload, contentType);
  }

  static delete(url) {
    return HttpRequest.request(HttpRequest.DELETE, url);
  }
}
