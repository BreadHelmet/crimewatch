from flask_restful import Resource
from flask_jwt_extended import jwt_refresh_token_required
from flask_jwt_extended.utils import create_access_token, get_jwt_identity
from flask.json import jsonify

class RefreshResource(Resource):

  @jwt_refresh_token_required
  def post(self):
    current_user = get_jwt_identity()
    return ({
      'access_token': create_access_token(identity=current_user)
    }), 200
