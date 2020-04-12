import sys
import argparse
from flask import Flask
from flask_cors import CORS
from flask_restful import Api, Resource
from models import db
from flask_jwt_extended import JWTManager
from resources.login import LoginResource
from resources.register import RegisterResource
from resources.incident import IncidentResource
from resources.incidents import IncidentsResource

if __name__ == '__main__':

  parser = argparse.ArgumentParser(prog='Crimewatch', description='Crime stats visualized')
  parser.add_argument('--env', '-e', help='Environment type: [ development | deployment | production ]')
  args = parser.parse_args()

  if 'env' not in vars(args):
    sys.exit('env not present in args. exiting.')

  env_arg = vars(args)['env']

  app = Flask(__name__)
  if env_arg == 'development':
    print('using development config')
    from config import DevelopmentConfig
    app.config.from_object(DevelopmentConfig())
  elif env_arg == 'staging':
    print('using staging config')
    from config import StagingConfig
    app.config.from_object(StagingConfig())
  elif env_arg == 'production' in sys.argv:
    print('using production config')
    from config import ProductionConfig
    app.config.from_object(ProductionConfig())
  else:
    sys.exit('no acceptable env type found in args. exiting')

  jwt = JWTManager(app)
  CORS(app)
  api = Api(app)
  db.init_app(app)
  app.app_context().push()
  db.create_all()

  api.add_resource(LoginResource, '/login')
  api.add_resource(RegisterResource, '/register')
  api.add_resource(IncidentsResource, '/incidents')
  api.add_resource(IncidentResource, '/incident/<string:id>')

  app.run()
