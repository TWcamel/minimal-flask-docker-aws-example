import database.db as db


def get_all_image():
    with db.DB() as _db:
        sql_cmd = "SELECT * FROM image"
        res = _db.fetch_db_response_column_name(sql_cmd=sql_cmd, is_fetch_one=False)
    return res


def add_image(image_url, img_desc):
    affected_rows = 0
    with db.DB() as _db:
        sql_cmd = """
        INSERT INTO image (image_url, description)
        VALUES (%(_url)s, %(_desc)s)
        """

        sql_param = {"_url": image_url, "_desc": img_desc}

        affected_rows += _db.crud(sql_cmd=sql_cmd, params=sql_param)
    return affected_rows
