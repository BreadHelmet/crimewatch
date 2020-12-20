from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from ..models import Actor, add_to_db

class ActorsResource(Resource):
  @jwt_required
  def get(self, id=None):
    if id is None:
      actors = Actor.get_all()
      return actors, 200

    actor = Actor.get_by_id(id)
    if actor is None:
      return 404
    return actor.toJSON(), 200

  @jwt_required
  def post(self):
    if not request.is_json:
      return 400

    name = request.get_json()['name']
    if not name:
      return 400

    pnumber = request.get_json()['pnumber']
    if not pnumber:
      return 400

    birth = request.get_json()['birth']
    if not birth:
      return 400

    height = request.get_json()['height']
    if not height:
      return 400

    sex = request.get_json()['sex']
    if not sex:
      return 400

    actor = Actor(
      name=name,
      pnumber=pnumber,
      birth=birth,
      height=height,
      sex=sex)
    add_to_db(actor)

    return ({ 'id': actor.id }), 200

  @jwt_required
  def put(self):
    if not request.is_json:
      return 400

    fields = request.get_json()

    if 'id' not in fields:
      return 400
    ident = fields['id']

    if 'name' not in fields:
      return 400
    name = fields['name']

    if 'pnumber' not in fields:
      return 400
    pnumber = fields['pnumber']

    if 'birth' not in fields:
      return 400
    birth = fields['birth']

    if 'height' not in fields:
      return 400
    height = fields['height']

    if 'sex' not in fields:
      return 400
    sex = fields['sex']

    actor = Actor.get_by_id(ident)
    actor.update(name, pnumber, birth, height, sex)

    return 200

  @jwt_required
  def delete(self, id):
    if id is None:
      return 400
    actor = Actor.get_by_id(id)
    if actor is None:
      return 404
    actor.delete()
    return 200
