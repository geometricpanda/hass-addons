"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PAYLOAD = exports.TOPIC = void 0;
var TOPIC;
(function (TOPIC) {
    TOPIC["CONFIG"] = "homeassistant/switch/dryer/config";
    TOPIC["STATE"] = "homeassistant/switch/dryer/state";
    TOPIC["SET"] = "homeassistant/switch/dryer/set";
})(TOPIC = exports.TOPIC || (exports.TOPIC = {}));
var PAYLOAD;
(function (PAYLOAD) {
    PAYLOAD["ONLINE"] = "online";
    PAYLOAD["OFFLINE"] = "offline";
    PAYLOAD["STATE_RUNNING"] = "ON";
    PAYLOAD["STATE_STANDBY"] = "OFF";
})(PAYLOAD = exports.PAYLOAD || (exports.PAYLOAD = {}));
