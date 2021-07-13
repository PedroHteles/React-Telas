
from flask import Flask, jsonify, redirect, request , url_for, session
import json
import sqlite3
from flask_cors import CORS



app = Flask(__name__)
CORS(app)

banco = sqlite3.connect('tabela.db')
cursor = banco.cursor()
cdas = cursor.execute("SELECT * FROM  cdas ").fetchall()
dbsalarioinss2 = cursor.execute("SELECT * FROM  modelo_veiculos").fetchall()
media_padrao = cursor.execute("SELECT * FROM  cda_padrao_abastecimentos").fetchall()
print (cdas)

@app.route('/teste')
def index():

    print(cdas,dbsalarioinss2)
    return jsonify ({

    }

    )




 
if __name__ == '__main__':
    
    app.run(debug=True)