import os
from dotenv import load_dotenv


class Config:
    def __init__(self):
        load_dotenv()

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        pass

    def get_mysql_config(self):
        return {
            "host": os.getenv("MYSQL_HOST"),
            "user": os.getenv("MYSQL_USER"),
            "password": os.getenv("MYSQL_PASSWORD"),
            "db": os.getenv("MYSQL_DB"),
            "port": os.getenv("MYSQL_PORT"),
            "charset": "utf8mb4",
        }

    def get_s3_url(self):
        return os.getenv("S3_URL")
