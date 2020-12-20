from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, create_access_token

class AuthorizationResource(Resource):

  # Let the client test if its access_token is still valid
  @jwt_required
  def get(self):
    return 200
