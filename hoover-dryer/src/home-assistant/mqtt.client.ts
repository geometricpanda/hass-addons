import {AsyncMqttClient, connect} from "async-mqtt";
import {MQTT_CREDENTIALS} from "./credentials";

export const mqttClient: AsyncMqttClient = connect(MQTT_CREDENTIALS);
