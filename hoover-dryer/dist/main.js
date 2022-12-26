"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mqqt_client_1 = require("./home-assistant/mqqt.client");
const dryer_entity_1 = require("./home-assistant/dryer.entity");
const mqqt_interface_1 = require("./home-assistant/mqqt.interface");
mqqt_client_1.mqqtClient.on('connect', async () => {
    await mqqt_client_1.mqqtClient.subscribe('presence');
    await mqqt_client_1.mqqtClient.subscribe(mqqt_interface_1.TOPIC.SET);
    await dryer_entity_1.dryerEntity.discoveryPublish();
    await dryer_entity_1.dryerEntity.setState(mqqt_interface_1.PAYLOAD.STATE_STANDBY);
});
mqqt_client_1.mqqtClient.on('message', (_topic, _payload) => {
    const topic = _topic.toString();
    const payload = _payload.toString();
    const commands = {
        [mqqt_interface_1.TOPIC.SET]: () => dryer_entity_1.dryerEntity.doCommand(payload),
        [mqqt_interface_1.TOPIC.CONFIG]: () => null,
        [mqqt_interface_1.TOPIC.STATE]: () => null,
    };
    const command = commands[topic];
    if (!command) {
        throw new Error(`Unknown ${topic} ${payload}`);
    }
    command();
});
mqqt_client_1.mqqtClient.on('error', err => console.error(err));
