import os
import sys
import argparse
import flask
import flask_cors
import flask_restful
import flask_sqlalchemy
from flask_jwt_extended import jwt_manager

# import resources
from .resources import get_resources
#from .resources import resource_definitions

db = flask_sqlalchemy.SQLAlchemy()

def create_app(environment):

  sys.path.append(
    os.path.join(
      os.path.dirname(__file__), '..'))
  #import config
  import config

  print("__name__", __name__)

  app = flask.Flask(__name__)
  app.config.from_object(config[environment])

  # init
  db.init_app(app)
  jwt_manager.JWTManager(app)
  flask_cors.CORS(app)
  api = flask_restful.Api(app)
  app.app_context().push()
  db.create_all()

  res = get_resources()
  for definition in res:
    api.add_resource(
      definition["resource"],
      definition["url"])

#FLASK_RUN_PORT
#
  # app.run(host='localhost', port=8000)
  return app
