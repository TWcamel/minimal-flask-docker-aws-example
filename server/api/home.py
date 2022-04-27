from flask import Blueprint, render_template

home = Blueprint("home", __name__, template_folder="../client")


@home.route("/")
def index():
    return render_template("index.html")
