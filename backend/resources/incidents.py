from flask import request
from time import time
from models import Incident
from flask_restful import Resource
from flask_jwt_extended import create_access_token, jwt_required

class IncidentsResource(Resource):
  @jwt_required
  def get(self):
    time.sleep(3)# TODO: remove

    # import random
    # import string
    # for i in range(20):
    #   title = ''.join(random.choice(string.ascii_letters) for i in range(10))
    #   description = ''.join(random.choice(string.ascii_letters) for i in range(60))
    #   incident = Incident(title=title, description=description)
    #   add_to_db(incident)

    # incident1 = Incident(title="incident 234", description="Incident 234 was hilarious... you had to be there")
    # add_to_db(incident1)
    # incident2 = Incident(title="incident 541", description="Not as much fun as incident 234 but still a good time.")
    # add_to_db(incident2)

    incidents = Incident.get_all()
    # print('incidents:')
    # pprint(incidents)
    #incidents = Incident.query.order_by(Incident.id).all()
    #incidents = jsonify(incidents=incidents)

    return incidents, 200

#pprint(incidents)
    # for incident in incidents:
    #   print(incident)

    # return ({
    #   234: {
    #     "id": 234,
    #     "title": "incident 234",
    #     "description": 'Incident 234 was hilarious... you had to be there',
    #   },
    #   541: {
    #     "id": 541,
    #     "title": "incident 541",
    #     "description": "Not as much fun as incident 234 but still a good time.",
    #   }
    # }), 200