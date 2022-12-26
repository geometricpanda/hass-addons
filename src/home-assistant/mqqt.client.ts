import {AsyncMqttClient, connect} from "async-mqtt";
import {MQTT_CREDENTIALS} from "./credentials";

export const mqqtClient: AsyncMqttClient = connect(MQTT_CREDENTIALS);
