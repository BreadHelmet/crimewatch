#!/usr/bin/env python3

import os

class Config():
  DEBUG = False
  TESTING = False
  DB_SERVER = 'localhost'
  DATABASE_URI = 'sqlite:///:memory'
  TYPE = 'default'

class DevelopmentConfig(Config):
  DEBUG = True
  TESTING = False
  ENV = 'development'
  DB_SERVER = 'localhost'
  TYPE = 'development' # <-- necessary?
  DATABASE_URI = 'sqlite:///:memory' # <-- necessary?
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
  