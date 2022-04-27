from flask import *
import configparser
from time import time
from api.home import home
from api.s3 import s3

app = Flask(__name__, static_folder="./client", static_url_path="/")


app.secret_key = str(time())
app.config["JSON_AS_ASCII"] = False
app.config["TEMPLATES_AUTO_RELOAD"] = True

app.register_blueprint(home)
app.register_blueprint(s3)


if __name__ == "__main__":
    app.run(debug=True, port=int("3000"), host="0.0.0.0")
