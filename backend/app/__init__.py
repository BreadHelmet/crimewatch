import sys
import os
import flask
from flask_cors import CORS
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended.jwt_manager import JWTManager

db = SQLAlchemy()

def create_app(config):

  app = flask.Flask(__name__)
  app.config.from_object(config)

  db.init_app(app)

  JWTManager(app)
  CORS(app)
  api = Api(app)
  app.app_context().push()

  from .resources.login import LoginResource
  from .resources.register import RegisterResource
  from .resources.incidents import IncidentsResource
  from .resources.refresh import RefreshResource
  from .resources.events import EventsResource
  from .resources.actors import ActorsResource
  from .resources.scenes import ScenesResource
  from .resources.props import PropsResource
  from .resources.auth import AuthorizationResource

  db.create_all()

  api.add_resource(LoginResource, "/users/login")
  api.add_resource(RegisterResource, "/users/register")
  api.add_resource(IncidentsResource, "/incidents", "/incidents/<string:id>")
  api.add_resource(RefreshResource, "/users/refresh")

  api.add_resource(EventsResource, "/events", "/events/<string:id>")
  api.add_resource(ActorsResource, "/actors", "/actors/<string:id>")
  api.add_resource(ScenesResource, "/scenes", "/scenes/<string:id>")
  api.add_resource(PropsResource, "/props", "/props/<string:id>")

  api.add_resource(AuthorizationResource, "/users/auth")

  return app
