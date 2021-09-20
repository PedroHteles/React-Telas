from flask import Flask,request,jsonify 
from flask_cors import CORS
from sqlalchemy import create_engine

app = Flask(__name__)
engine = create_engine('mysql://root:password@localhost/telalogistica', echo = True)
CORS(app)

from api.admin import rotas