from flask import request, jsonify
from flask_restful import Resource
from flask_jwt_extended import create_access_token
from ..models import User

class LoginResource(Resource):
  def post(self):
    if not request.is_json:
      return 400

    email = request.get_json()['email']
    if not email:
      return 400

    password = request.get_json()['password']
    if not password:
      return 400

    user = User.get_by_email(email)
    if user == None:
      return 401

    if User.verify_password(password, user.password):
      return ({
        'access_token': create_access_token(identity=email),
        }), 200
    else:
      return 401
