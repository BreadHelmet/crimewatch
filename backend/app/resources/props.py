from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from ..models import Prop, add_to_db

class PropsResource(Resource):
  def get(self, id=None):
    if id is None:
      props = Prop.get_all()
      return props, 200

    prop = Prop.get_by_id(id)
    if prop is None:
      return 404
    print('prop:', prop)
    return prop.toJSON(), 200

  @jwt_required
  def post(self):
    if not request.is_json:
      return 400

    name = request.get_json()['name']
    if not name:
      return 400

    description = request.get_json()['description']
    if not description:
      return 400

    prop = Prop(
      name=name,
      description=description)
    add_to_db(prop)

    return ({ 'id': prop.id }), 200

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

    if 'description' not in fields:
      return 400
    description = fields['description']

    prop = Prop.get_by_id(ident)
    prop.update(name, description)

    return 200

  @jwt_required
  def delete(self, id=None):
    if id is None:
      return 400
    prop = Prop.get_by_id(id)
    if prop is None:
      return 404
    prop.delete()
    return 200
