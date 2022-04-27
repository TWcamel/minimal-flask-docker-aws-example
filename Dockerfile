FROM python:3

RUN mkdir -p /app/server
WORKDIR /app/server 

COPY requirements.txt /app
RUN pip install -r /app/requirements.txt

COPY . /app

# Set Timezone to CST
ENV TZ=Asia/Taipei
RUN ln -snf /usr/share/zoneinfo/TZ\
  /etc/localtime\
  && echo $TZ > /etc/Timezone

EXPOSE 3000

VOLUME ["/minimal-flask-docker-example"]

ENTRYPOINT ["sh", "-c", "python3 /app/server/app.py"]

