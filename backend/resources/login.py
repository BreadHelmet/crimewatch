from flask import request
from models import User
from flask_restful import Resource
from flask_jwt_extended import create_access_token

class Login(Resource):
  def post(self):
    if not request.is_json:
      return ({"msg":"Missing JSON in request"}), 400

    email = request.get_json()['email']
    if not email:
      return ({'msg': 'Missing email argument'}), 400

    password = request.get_json()['password']
    if not password:
      return ({'msg': 'Missing password argument'}), 400

    user = User.get_by_email(email)
    if user == None:
      return ({'msg': 'Login failed'}), 401

    if User.verify_password(password, user.password):
      access_token = create_access_token(identity=email)
      return ({'access_token': access_token}), 200
    else:
      return ({'msg': 'Login failed'}), 401
