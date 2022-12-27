import {connect, MqttClient} from "mqtt";
import * as dotenv from 'dotenv'

dotenv.config()

const {MQTT_HOST, MQTT_PORT, MQTT_USER, MQTT_PASSWORD} = process.env;

const CREDENTIALS = {
    host: MQTT_HOST!,
    port: +MQTT_PORT!,
    username: MQTT_USER!,
    password: MQTT_PASSWORD!,
}

export const mqtt: MqttClient = connect(CREDENTIALS);
