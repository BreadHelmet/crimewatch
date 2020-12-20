#!/usr/bin/env python3

# https://flask.palletsprojects.com/en/1.1.x/config/

import os
import datetime

class Config():
  ENV = 'development'
  DEBUG = True
  TESTING = True
  # PROPAGATE_EXCEPTIONS
  # PRESERVE_CONTEXT_ON_EXCEPTION
  # TRAP_HTTP_EXCEPTIONS
  # TRAP_BAD_REQUEST_ERRORS
  SECRET_KEY = os.environ.get('APP_KEY')
  # SESSION_COOKIE_NAME
  # SESSION_COOKIE_DOMAIN
  # SESSION_COOKIE_PATH
  # SESSION_COOKIE_HTTPONLY
  # SESSION_COOKIE_SECURE
  # SESSION_COOKIE_SAMESITE
  # PERMANENT_SESSION_LIFETIME
  # SESSION_REFRESH_EACH_REQUEST
  # USE_X_SENDFILE
  # SEND_FILE_MAX_AGE_DEFAULT
  # SERVER_NAME
  # APPLICATION_ROOT
  # PREFERRED_URL_SCHEME
  # MAX_CONTENT_LENGTH
  # JSON_AS_ASCII
  # JSON_SORT_KEYS
  # JSONIFY_PRETTYPRINT_REGULAR
  # JSONIFY_MIMETYPE
  # TEMPLATES_AUTO_RELOAD
  # EXPLAIN_TEMPLATE_LOADING
  # MAX_COOKIE_SIZE

  # DB_SERVER = 'localhost'
  # DATABASE_URI = 'sqlite:///:memory'
  #TYPE = 'default'
  JWT_ACCESS_TOKEN_EXPIRES = datetime.timedelta(days=1)

class DevelopmentConfig(Config):

  # Environment config
  ENV = 'development'
  DEBUG = True
  TESTING = True
  SECRET_KEY = os.environ.get('APP_KEY')

  # Database
  SQLALCHEMY_DATABASE_URI = 'sqlite:///crimewatch.db'
  SQLALCHEMY_ECHO = True
  SQLALCHEMY_TRACK_MODIFICATIONS = True

class StagingConfig(Config):
  TESTING = False
  DB_SERVER = 'localhost'
  DATABASE_URI = 'sqlite:///:memory'
  #TYPE = 'development'

class ProductionConfig(Config):
  ENV = 'production'
  DEBUG = False
  TESTING = False
  DB_SERVER = 'localhost'
  DATABASE_URI = 'sqlite:///:memory'
  #TYPE = 'production'

config = {
  'development': DevelopmentConfig,
  'staging': StagingConfig,
  'production': ProductionConfig,
}
