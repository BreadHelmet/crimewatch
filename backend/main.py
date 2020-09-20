import argparse
import sys
from app import create_app
#from .app import create_app

parser = argparse.ArgumentParser(prog='crimewatch', description='visualized crime stats')
parser.add_argument('--env', help='Environment type: [ development | staging | production ]')
parser.add_argument('--host', help='host')
parser.add_argument('--port', help='port')
args = vars(parser.parse_args())

if 'env' not in args:
  sys.exit('env not present in args. exiting.')
if 'host' not in args:
  sys.exit('host not present in args. exiting.')
if 'port' not in args:
  sys.exit('port not present in args. exiting.')

app = create_app(args['env'])
host = args['host']
port = args['port']

print("__name__", __name__)

if __name__ == '__main__':
  app.run(host=host, port=port)
