from flask import Flask
app = Flask(__name__)
import views

@app.route(/)
def render_static(index.html):
	return render_template('%s.html' % index.html)

@app.route(/game)
def render_static(game.html):
	return render_template('%s.html' % game.html)

@app.route(/about)
def render_static(about.html):
	return render_template('%s.html' % about.html)		


if __name__ == '__main__':
	app.run()

