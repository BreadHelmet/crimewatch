from .login import LoginResource
from .register import RegisterResource
from .incident import IncidentResource
from .incidents import IncidentsResource

def get_resources():
  resources = []
  resources.append({ "resource": LoginResource, "url": "/login" })
  resources.append({ "resource": RegisterResource, "url": "/register" })
  resources.append({ "resource": IncidentsResource, "url": "/incidents" })
  resources.append({ "resource": IncidentResource, "url": "/incident/<string:id>" })
  return resources