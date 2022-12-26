"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mqqtClient = void 0;
const async_mqtt_1 = require("async-mqtt");
const credentials_1 = require("./credentials");
exports.mqqtClient = (0, async_mqtt_1.connect)(credentials_1.MQTT_CREDENTIALS);
