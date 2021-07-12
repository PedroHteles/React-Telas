import sqlite3
from flask import Flask, render_template, redirect, request , url_for, session


app = Flask(__name__)

@app.route('/teste', methods=['GET'])
def banco():
    print('cda')
    return {
        'oi':'oi'
    }


 
if __name__ == '__main__':
    
    app.run(debug=True)