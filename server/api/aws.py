from flask import Blueprint, request, render_template, make_response
from models import image as image_model
import config.config as aws_config
import utils.requests as requests
import json

aws = Blueprint("aws", __name__, template_folder="../client")


@aws.route("/api/aws/images", methods=["GET"])
def image_downloader():
    images = image_model.get_all_image()
    return make_response({"ok": True, "data": images})


@aws.route("/api/aws/image", methods=["POST"])
def image_uploader():
    body = request.form.to_dict()

    with aws_config.Config() as _aws_config:
        s3_url = _aws_config.get_s3_url()

    if (
        (name := body["image_name"]) is not None
        and (img_desc := body["description"]) is not None
        and (img := body["image"]) is not None
        and s3_url
    ):
        res_apigw_s3 = requests.Threaded(
            url=f"{s3_url}/{name}",
            method="PUT",
            data=img,
            headers={"Content-Type": "image/jpeg"},
        ).run()

        affected_rows = image_model.add_image(
            image_url=f"{s3_url}/{name}", img_desc=img_desc
        )
        return make_response({"ok": True, "data": {"affected_rows": affected_rows}})
    else:
        return make_response({"error": True, "messgae": "no image url"}, 400)
