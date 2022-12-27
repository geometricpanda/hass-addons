import {IClientOptions} from 'mqtt';
import * as dotenv from 'dotenv'

dotenv.config()

const {
    MQTT_HOST,
    MQTT_PORT,
    MQTT_USER,
    MQTT_PASSWORD,
} = process.env;

console.log(process.env);

export const MQTT_CREDENTIALS: IClientOptions = {
    host: MQTT_HOST,
    port: MQTT_PORT ? +MQTT_PORT : undefined,
    username: MQTT_USER,
    password: MQTT_PASSWORD,
}

