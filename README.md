# dynamodb-to-iot

This is trigger function to send message to iot. When create new record in dynamodb, browser catch the message.
using dynamodb, lambda, iot

## Preparation
### install aws-cli
Please install aws cli and set config
```
pip install awscli
```

### install serverless and aws-sdk
Plese install over 1.8
```
npm install -g serverless
npm install -g aws-sdk
```

### create IAM user for subscribe mqtt client
Create IAM User and Attach a Policy(AWSIoTDataAccess).

```
AWSIoTDataAccess
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "iot:Connect",
                "iot:Publish",
                "iot:Subscribe",
                "iot:Receive",
                "iot:GetThingShadow",
                "iot:UpdateThingShadow"
            ],
            "Resource": "*"
        }
    ]
}
```

### set environment

```
$cp .env.example .env
```

```
AWS_ACCESS_KEY=<Set your iam Access Key>
AWS_SECRET_ACCESS_KEY=<Set your iam Seacret Access Key>
AWS_IOT_ENDPOINT=<Set your iot endpoint>
REGION=<Set your iot region>
AWS_IOT_TOPIC=<Set your topic name>
```

## deploy

```
$ AWS_IOT_ENDPOINT=<AWS_IOT_ENDPOINT> AWS_IOT_TOPIC=<AWS_IOT_TOPIC> AWS_ACCOUNTID=<AWS_ACCOUNTID> sls deploy
```

## Start subscriber.

When your update your dynamodb(dev-dynamodbToIot-messages), you will receive that message.

```
$ npm start

> dynamodb-to-iot@1.0.0 start /Users/ganezasan/dynamo-to-iot
> node subscriber.js

connected to iot mqtt websocket
{"Records":[{"eventID":"b93b7b04e9f28605bf67dcc9b0594f5b","eventName":"INSERT","eventVersion":"1.1","eventSource":"aws:dynamodb","awsRegion":"ap-northeast-1","dynamodb":{"ApproximateCreationDateTime":1507699380,"Keys":{"id":{"S":"Hello world"}},"NewImage":{"id":{"S":"Hello world"}},"SequenceNumber":"2432700000000005735993974","SizeBytes":26,"StreamViewType":"NEW_AND_OLD_IMAGES"},"eventSourceARN":"arn:aws:dynamodb:ap-northeast-1:xxxxxxx:table/dev-dynamodbToIot-messages/stream/2017-10-10T16:00:19.961"}]}
```
