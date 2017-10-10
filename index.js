const mqtt = require('mqtt')
const AWSMqtt = require("aws-mqtt-client").default

const {MQTT_HOST, MQTT_USER, MQTT_PASS, MQTT_PATH, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_SESSION_TOKEN, AWS_IOT_ENDPOINT_HOST, AWS_REGION, AWS_SUBSCRIBE, MQTT_SUBSCRIBE} = process.env

const awsMqttClient = new AWSMqtt({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  endpointAddress: AWS_IOT_ENDPOINT_HOST,
  region: AWS_REGION
});

const mqttClient = mqtt.connect(MQTT_HOST, {
  username: MQTT_USER,
  password: MQTT_PASS
})

awsMqttClient.on('connect', () => {
  awsMqttClient.subscribe(AWS_SUBSCRIBE, {qos: 1});
  console.log('AWS connected');
});

awsMqttClient.on('message', (topic, message) => mqttClient.publish(topic, message, {qos: 2}));

awsMqttClient.on('error', (error) => console.error("aws - error", error));

awsMqttClient.on('close', (error) => console.error('aws - close', error));

awsMqttClient.on('offline', (error) => console.error('aws -  offline', error));

awsMqttClient.on('reconnect', (error) => console.log('aws - reconnect', error));

mqttClient.on('connect', () => {
  mqttClient.subscribe(MQTT_SUBSCRIBE, {qos: 2})
  console.log("mqtt - connected")
})

mqttClient.on('error', (error) => console.error('mqtt - error', error))

mqttClient.on('close', () => console.error("mqtt - close"))

mqttClient.on('offline', () => console.log("mqtt - offline"))

mqttClient.on('message', (topic, message) => awsMqttClient.publish(topic, message, {qos: 1}));

