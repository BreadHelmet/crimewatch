from flask_sqlalchemy import SQLAlchemy
import hashlib, binascii, os

db = SQLAlchemy();

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

  @classmethod
  def get_by_id(cls, id):
    return cls.query.filter_by(id=id).first()
  
  @classmethod
  def get_all(cls):
    return dict(list(map(lambda x: (x.id, cls.to_json(x)), cls.query.all())))
  
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
