import argparse
import sys
from app import create_app
from config import config

parser = argparse.ArgumentParser(prog='crimewatch', description='visualized crime stats')
parser.add_argument('--env', '-e', help='Environment type: [ development | staging | production ]')
args = vars(parser.parse_args())

if 'env' not in args:
  sys.exit('env not present in args. exiting.')

app = create_app(config[args['env']])

if __name__ == '__main__':
  app.run(host='localhost', port=8000)
