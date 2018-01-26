from flask import Flask
app = Flask(__name__)
import views
#Making Database
from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:////tmp/test.db'
db = SQLAlchemy(app)

class User(db.Model):
	#Create user variables
	id = db.Column(db.Integer, primary_key = True)
	name = db.Column(db.String(80), nullable =False)
	email = db.Column(db.String(256), nullable = False)
	pwd = db.Column(db.String(80), nullable = False)
	highScore = db.Column(db.Integer, default = 0)



#website routing
#@app.route('/')
#def home: 
	#return render_template('%s.html' % index.html)

#@app.route('/game')
#def render_static(game.html):
#	return render_template('%s.html' % game.html)

#@app.route('/about')
#def render_static(about.html):
#	return render_template('%s.html' % about.html)		


if __name__ == '__main__':
	app.run()

