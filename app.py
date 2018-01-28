from flask import Flask, flash, redirect, render_template, request, session, abort
import os
from flask.ext.session import Session
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.debug=True
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:////tmp/test.db'
db = SQLAlchemy(app)
sess = Session()

class User(db.Model):
	#Create user variables
	id = db.Column(db.Integer, primary_key = True)
	name = db.Column(db.String(80), nullable =False)
	email = db.Column(db.String(256), nullable = False)
	pwd = db.Column(db.String(80), nullable = False)
	highScore = db.Column(db.Integer, default = 0)

@app.route('/signup', methods=['POST', 'GET'])
def signup():
	user = User()
	user.name = request.form['user_name']
	user.email = request.form['user_email']
	user.pwd = request.form['user_pwd']
	db.session.add(user)
	db.session.commit()
	return render_template('game.html', user = user)

#db.drop_all()
#db.rollback()
db.create_all()


#website routing
@app.route('/')
def register(): 
	return render_template('register.html')

@app.route('/game')
def home():
	return render_template('game.html')


if __name__ == '__main__':
	app.secret_key = 'super secret key'
	app.config['SESSION_TYPE'] = 'filesystem'
	sess.init_app(app)
	app.run(debug = True)

