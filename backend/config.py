#!/usr/bin/env python3

# https://flask.palletsprojects.com/en/1.1.x/config/

import os

class Config():
  SQLALCHEMY_TRACK_MODIFICATIONS = True
  DEBUG = False
  TESTING = False
  DB_SERVER = 'localhost'
  DATABASE_URI = 'sqlite:///:memory'
  TYPE = 'default'

class DevelopmentConfig(Config):
  SERVER_NAME = '127.0.0.1:8000'
  DEBUG = True
  TESTING = True

  ENV = 'development'
  TYPE = 'development'

  DB_SERVER = 'localhost'
  DATABASE_URI = 'sqlite:///:memory'

  SQLALCHEMY_DATABASE_URI = 'sqlite:///crimewatch.db'
  SECRET_KEY = os.environ.get('APP_KEY')
  

class StagingConfig(Config):
  DEBUG = True
  TESTING = False
  DB_SERVER = 'localhost'
  DATABASE_URI = 'sqlite:///:memory'
  TYPE = 'development'

class ProductionConfig(Config):
  DEBUG = False
  TESTING = False
  DB_SERVER = 'localhost'
  DATABASE_URI = 'sqlite:///:memory'
  TYPE = 'development'
  