from flask import Blueprint, render_template, make_response

s3 = Blueprint("s3", __name__, template_folder="../client")


@s3.route("/")
def image_downloader():
    # TODO: Add a route to download an image from S3
    return make_response({"ok": True})
