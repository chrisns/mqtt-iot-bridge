# IOT <> MQTT bridge

Usage: 
```bash
docker run \
  -e AWS_REGION=eu-west-2
  -e AWS_IOT_ENDPOINT_HOST=YOURS.iot.eu-west-2.amazonaws.com \
  -e AWS_ACCESS_KEY=YOURS \
  -e AWS_SECRET_ACCESS_KEY=YOURS \
  -e AWS_SUBSCRIBE="notify/out/+" \
  -e MQTT_USER=iot-bridge \
  -e MQTT_PASS=YOURS \
  -e MQTT_SUBSCRIBE="notify/in/+" \
  -e MQTT_HOST="mqtt://YOURS" \ 
  chrisns/mqtt-iot-bridge

```