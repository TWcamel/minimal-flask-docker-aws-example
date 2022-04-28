# ABOUT

This is a minimal docker image runs flask connects to AWS and uses EC2/RDS/S3/etc services. Details are shown below in [FUNCTION](#FUNCTION) area.

## DEPENDENCIES

1. An AWS Free-tier account
2. Knowledge of S3/RDS and EC2
3. Docker
4. Patience

# FUNCTION

## ENDPOINT ACCESS

-   S3 (only `get` and `put` are allowed): https://euqn60nqt1.execute-api.ap-northeast-1.amazonaws.com/v1/docker-flask-s3-bucket/test.png
-   RDS: TBD

## TODO

-   [x] Upload/download images to/from S3 from ApiGateway deployed on AWS
-   [ ] RDS to store image path data
-   [ ] Explain this repo in README.md

# USEFUL LINKS

-   [Amazon Relational Database Service](https://docs.aws.amazon.com/zh_tw/AmazonRDS/latest/UserGuide/USER_CreateDBInstance.html)
-   [How do I upload an image file to Amazon S3 through API Gateway?](https://aws.amazon.com/premiumsupport/knowledge-center/api-gateway-upload-image-s3/)
-   [Create a REST API as an Amazon S3 proxy in API Gateway](https://docs.aws.amazon.com/zh_tw/apigateway/latest/developerguide/integrating-api-with-aws-services-s3.html)
