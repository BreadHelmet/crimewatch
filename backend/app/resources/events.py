from flask import request, jsonify
from ..models import Incident, add_to_db
from flask_restful import Resource
from flask_jwt_extended import create_access_token, jwt_required

class EventsResource(Resource):
  @jwt_required
  def get(self, id=None):
    if id is None:
      incidents = Incident.get_all()
      return incidents, 200

    incident = Incident.get_by_id(id)
    if incident is None:
      return 404
    return (incident.toJSON()), 200

  @jwt_required
  def post(self):
    if not request.is_json:
      return 400

    title = request.get_json()['title']
    if not title:
      return 400

    description = request.get_json()['description']
    if not description:
      return 400

    incident = Incident(title=title, description=description)
    add_to_db(incident)

    return ({ 'id': incident.id }), 200

  @jwt_required
  def put(self):
    if not request.is_json:
      return 400

    fields = request.get_json()

    if 'id' not in fields:
      return 400
    ident = fields['id']

    if 'title' not in fields:
      return 400
    title = fields['title']

    if 'description' not in fields:
      return 400
    description = fields['description']

    incident = Incident.get_by_id(ident)
    incident.update(title, description)

    return 200

  @jwt_required
  def delete(self, id=None):
    if id is None:
      return 400
    incident = Incident.get_by_id(id)
    if incident is None:
      return 404
    incident.delete()
    return 200
