from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from ..models import Scene, add_to_db

class ScenesResource(Resource):
  @jwt_required
  def get(self, id=None):
    if id is None:
      scenes = Scene.get_all()
      return scenes, 200

    scene = Scene.get_by_id(id)
    if scene is None:
      return 404
    return (scene.toJSON()), 200

  @jwt_required
  def post(self):
    if not request.is_json:
      return 400

    title = request.get_json()['title']
    if not title:
      return 400

    description = request.get_json()['description']
    if not description:
      return 400

    lon = request.get_json()['lon']
    if not lon:
      return 400

    lat = request.get_json()['lat']
    if not lat:
      return 400

    scene = Scene(
      title=title,
      description=description,
      lon=lon,
      lat=lat)
    add_to_db(scene)

    return ({ 'id': scene.id }), 200

  @jwt_required
  def put(self):
    if not request.is_json:
      return 400

    fields = request.get_json()

    if 'id' not in fields:
      return 400
    ident = fields['id']

    if 'title' not in fields:
      return 400
    title = fields['title']

    if 'description' not in fields:
      return 400
    description = fields['description']

    if 'lon' not in fields:
      return 400
    lon = fields['lon']

    if 'lat' not in fields:
      return 400
    lat = fields['lat']

    scene = Scene.get_by_id(ident)
    scene.update(
      title,
      description,
      lon,
      lat)

    return 200

  @jwt_required
  def delete(self, id):
    if id is None:
      return 400
    scene = Scene.get_by_id(id)
    if scene is None:
      return 404
    scene.delete()
    return 200
