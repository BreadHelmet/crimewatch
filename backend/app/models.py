from flask_sqlalchemy import SQLAlchemy
import hashlib, binascii, os
from . import db
from sqlalchemy import Column
from flask_sqlalchemy.model import Model
from sqlalchemy.types import Float, Integer, String

def add_to_db(entry):
  try:
    db.session.add(entry)
    db.session.commit()
  except Exception as e:
    db.session.rollback()
    raise(e)

def delete_from_database(entry):
  try:
    db.session.delete(entry)
    db.session.commit()
  except Exception as e:
    db.session.rollback()
    raise(e)

class Incident(db.Model):
  __tablename__ = 'incidents'
  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(50))
  description = db.Column(db.String(50))

  def toJSON(self):
    # TODO: proper json.dumps or similar
    return {
      'id': self.id,
      'title': self.title,
      'description': self.description,
    }

  def update(self, title, description):
    self.title = title
    self.description = description
    db.session.commit()

  def delete(self):
    db.session.delete(self)
    db.session.commit()

  @classmethod
  def get_by_id(cls, id):
    return cls.query.filter_by(id=id).first()

  @classmethod
  def get_all(cls):
    return list(map(lambda x: cls.to_json(x), cls.query.all()))

  @staticmethod
  def to_json(incident):
    return {
      'id': incident.id,
      'title': incident.title,
      'description': incident.description,
    }

class User(db.Model):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key=True)
  email = db.Column(db.String(40))
  password = db.Column(db.String(128))

  @classmethod
  def get_by_email(cls, email):
    return cls.query.filter_by(email=email).first()

  @staticmethod
  def hash_password(password):
    salt = hashlib.sha256(os.urandom(60)).hexdigest().encode('ascii')
    pwdhash = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'), salt, 100000)
    pwdhash = binascii.hexlify(pwdhash)
    return (salt + pwdhash).decode('ascii')

  @staticmethod
  def verify_password(provided_password, stored_password):
    salt = stored_password[:64]
    stored_password = stored_password[64:]
    pwdhash = hashlib.pbkdf2_hmac('sha512', provided_password.encode('utf-8'), salt.encode('ascii'), 100000)
    pwdhash = binascii.hexlify(pwdhash).decode('ascii')
    return pwdhash == stored_password

class Scene(db.Model):
  __tablename__ = 'scenes'
  id = db.Column(db.Integer, primary_key=True)
  lon = db.Column(db.Float)
  lat = db.Column(db.Float)
  title = db.Column(db.String(50))
  description = db.Column(db.String(50))

  def toJSON(self):
    # TODO: proper json.dumps or similar
    return {
      'id': self.id,
      'title': self.title,
      'description': self.description,
      'lon': self.lon,
      'lat': self.lat,
    }

  def update(self, title, description, lon, lat):
    self.title = title
    self.description = description
    self.lon = lon
    self.lat = lat
    db.session.commit()

  def delete(self):
    db.session.delete(self)
    db.session.commit()

  @classmethod
  def get_by_id(cls, id):
    return cls.query.filter_by(id=id).first()

  @classmethod
  def get_all(cls):
    return list(map(lambda x: cls.to_json(x), cls.query.all()))

  @staticmethod
  def to_json(scene):
    return {
      'id': scene.id,
      'title': scene.title,
      'description': scene.description,
      'lon': scene.lon,
      'lat': scene.lat,
    }

class Actor(db.Model):
  __tablename__ = 'actors'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50))
  pnumber = db.Column(db.Integer)
  birth = db.Column(db.DateTime)
  height = db.Column(db.Float)
  sex = db.Column(db.String)

  def toJSON(self):
    # TODO: proper json.dumps or similar
    return {
      'id': self.id,
      'name': self.name,
      'pnumber': self.pnumber,
      'birth': self.birth.strftime('%Y-%d-%m %H:%M:%S'),
      'height': self.height,
      'sex': self.sex,
    }

  def update(self, name, pnumber, birth, height, sex):
    self.name = name
    self.pnumber = pnumber
    self.birth = birth
    self.height = height
    self.sex = sex
    db.session.commit()

  def delete(self):
    db.session.delete(self)
    db.session.commit()

  @classmethod
  def get_by_id(cls, id):
    return cls.query.filter_by(id=id).first()

  @classmethod
  def get_all(cls):
    return list(map(lambda x: cls.to_json(x), cls.query.all()))

  @staticmethod
  def to_json(actor):
    return {
      'id': actor.id,
      'name': actor.name,
      'pnumber': actor.pnumber,
      'birth': actor.birth.strftime('%Y-%d-%m %H:%M:%S'),
      'height': actor.height,
      'sex': actor.sex,
    }

class Prop(db.Model):
  __tablename__ = 'props'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50))
  description = db.Column(db.String(50))

  def toJSON(self):
    # TODO: proper json.dumps or similar
    return {
      'id': self.id,
      'name': self.name,
      'description': self.description,
    }

  def update(self, name, description):
    self.name = name
    self.description = description
    db.session.commit()

  def delete(self):
    db.session.delete(self)
    db.session.commit()

  @classmethod
  def get_by_id(cls, id):
    return cls.query.filter_by(id=id).first()

  @classmethod
  def get_all(cls):
    return list(map(lambda x: cls.to_json(x), cls.query.all()))

  @staticmethod
  def to_json(prop):
    return {
      'id': prop.id,
      'name': prop.name,
      'description': prop.description,
    }
