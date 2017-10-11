const AWS = require('aws-sdk');
const iotData = new AWS.IotData({ endpoint: process.env.AWS_IOT_ENDPOINT });

const handler = (event, context) => {
  const params = {
    topic: process.env.AWS_IOT_TOPIC,
    payload: JSON.stringify(event)
  }

  iotData.publish(params, (err, res) => {
    if (err) return context.fail(err);
    return context.succeed();
  });
};

exports.handler = handler;
