# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from flask_restful import Api, Resource
# from datetime import datetime
# import sqlite3
# from models import db, add_to_db, User, Incident
# import time
# from pprint import pprint
# import sys
# from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity

# app = Flask(__name__)

# app.config['DEBUG'] = True # Important, "server is only accessible from your own computer".
# app.config['TESTING'] = False
# app.config['ENV'] = 'development'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///crimewatch.db'
# app.config['SECRET_KEY'] = 'super-secret' # CHANGE!! use env var

# jwt = JWTManager(app);
# CORS(app)
# api = Api(app)
# db.init_app(app)
# app.app_context().push()
# db.create_all()

# class Login(Resource):
#   def post(self):
#     if not request.is_json:
#       return ({"msg":"Missing JSON in request"}), 400

#     email = request.get_json()['email']
#     if not email:
#       return ({'msg': 'Missing email argument'}), 400

#     password = request.get_json()['password']
#     if not password:
#       return ({'msg': 'Missing password argument'}), 400

#     user = User.get_by_email(email)
#     if user == None:
#       return ({'msg': 'Login failed'}), 401

#     if User.verify_password(password, user.password):
#       access_token = create_access_token(identity=email)
#       return ({'access_token': access_token}), 200
#     else:
#       return ({'msg': 'Login failed'}), 401

# class Register(Resource):
#   def post(self):
#     time.sleep(5)
    
#     if not request.is_json:
#       return ({"msg":"Missing JSON in request"}), 400
    
#     email = request.get_json()['email']
#     if not email:
#       return ({'msg': 'Missing email argument'}), 400

#     password = request.get_json()['password']
#     if not password:
#       return ({'msg': 'Missing password argument'}), 400
    
#     user = User.get_by_email(email)
#     if user != None:
#       return ({'msg': 'User already exists'}), 400

#     pwd = User.hash_password(password)
    
#     user = User(email=email, password=pwd)
#     add_to_db(user)
#     access_token = create_access_token(identity=email)
#     return ({'access_token': access_token}), 200

# class IncidentListResource(Resource):
#   @jwt_required
#   def get(self):
#     time.sleep(3)

#     # import random
#     # import string
#     # for i in range(20):
#     #   title = ''.join(random.choice(string.ascii_letters) for i in range(10))
#     #   description = ''.join(random.choice(string.ascii_letters) for i in range(60))
#     #   incident = Incident(title=title, description=description)
#     #   add_to_db(incident)

#     # incident1 = Incident(title="incident 234", description="Incident 234 was hilarious... you had to be there")
#     # add_to_db(incident1)
#     # incident2 = Incident(title="incident 541", description="Not as much fun as incident 234 but still a good time.")
#     # add_to_db(incident2)

#     incidents = Incident.get_all()
#     # print('incidents:')
#     # pprint(incidents)
#     #incidents = Incident.query.order_by(Incident.id).all()
#     #incidents = jsonify(incidents=incidents)

#     return incidents, 200


#     #pprint(incidents)
#     # for incident in incidents:
#     #   print(incident)

#     # return ({
#     #   234: {
#     #     "id": 234,
#     #     "title": "incident 234",
#     #     "description": 'Incident 234 was hilarious... you had to be there',
#     #   },
#     #   541: {
#     #     "id": 541,
#     #     "title": "incident 541",
#     #     "description": "Not as much fun as incident 234 but still a good time.",
#     #   }
#     # }), 200

# class IncidentResource(Resource):
#   @jwt_required
#   def get(self, id):
#     time.sleep(5)
#     incident = Incident.get_by_id(id)
#     if incident == None:
#       return ({'msg': 'Not found.'}), 404
#     return (incident.toJSON()), 200

# api.add_resource(Login, '/login')
# api.add_resource(Register, '/register')
# api.add_resource(IncidentResource, '/incident/<string:id>')
# api.add_resource(IncidentListResource, '/incidents')

# if __name__ == '__main__':
#   app.run(host='localhost', port=8000)
