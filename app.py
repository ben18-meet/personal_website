from flask import Flask, flash, redirect, render_template, request, session, abort
import os
from flask.ext.session import Session
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin

app = Flask(__name__)
app.debug=True
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:////tmp/test.db'
db = SQLAlchemy(app)
sess = Session()



class User(db.Model, UserMixin):
#Create user variables
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(80), nullable =False)
    email = db.Column(db.String(256), nullable = False, unique= True)
    pwd = db.Column(db.String(80), nullable = False)
    highScore = db.Column(db.Integer, default = 0)



@app.route('/game', methods=['POST', 'GET'])
def game():
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

@app.route('/login', methods=['POST', 'GET'])
def login():
    error = None
    loginEmail = request.form['loginEmail']
    loginPwd = request.form['loginPwd']

    query = db.session.query(User).filter(User.email.in_([loginEmail]), User.pwd.in_([loginPwd]) )
    user = query.first()
    if user:
        session['logged_in'] = True
        return render_template('game.html', user = user)
    else:
        error = 'Invalid username or password. Please try again!'
    return signIn()

#website routing
@app.route('/')
def register(): 
	return render_template('register.html')

@app.route('/signIn')
def signIn():
    return render_template('login.html')    

@app.route('/home')
def home():
    return render_template('game.html')

@app.route('/aboutUs')
def aboutUs():
    return render_template('about.html')        


@app.route('/logout')
def logout():
    return render_template('register.html')



if __name__ == '__main__':
    app.secret_key = 'super secret key'
    app.config['SESSION_TYPE'] = 'filesystem'
    sess.init_app(app)
    app.run(debug = True)

