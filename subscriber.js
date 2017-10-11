require('dotenv').config();
const AWSMqtt = require('aws-mqtt-client').default;

const mqttClient = new AWSMqtt({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  endpointAddress: process.env.AWS_IOT_ENDPOINT,
  region: process.env.REGION
});

mqttClient.on('connect', () => {
  mqttClient.subscribe(process.env.AWS_IOT_TOPIC);
  console.log('connected to iot mqtt websocket');

  mqttClient.publish(process.env.AWS_IOT_TOPIC, 'connected');
});

mqttClient.on('message', (topic, message) => {
  console.log(message.toString());
});
