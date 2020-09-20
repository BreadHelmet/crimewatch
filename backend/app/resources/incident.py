from flask import request
from models import Incident
from flask_restful import Resource
from flask_jwt_extended import create_access_token, jwt_required

# from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity

class IncidentResource(Resource):
  # @jwt_required
  def get(self, id):
    incident = Incident.get_by_id(id)
    if incident == None:
      return ({'msg': 'Not found.'}), 404
    return (incident.toJSON()), 200
