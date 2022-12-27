import {mqttClient} from "./home-assistant/mqtt.client";
import {dryerEntity} from "./home-assistant/dryer.entity";
import {PAYLOAD, TOPIC} from "./home-assistant/mqqt.interface";

console.log('CONNECTING');

mqttClient.on('connect', async () => {
    await mqttClient.subscribe('presence');
    await mqttClient.subscribe(TOPIC.SET);

    await dryerEntity.discoveryPublish();
    await dryerEntity.setState(PAYLOAD.STATE_STANDBY);
    console.info('WAITING FOR MESSAGES');
});

mqttClient.on('message', (_topic, _payload) => {
    const topic = _topic.toString() as TOPIC;
    const payload = _payload.toString() as PAYLOAD;
    console.info('MESSAGE', topic, payload);
    const commands: Record<TOPIC, () => void> = {
        [TOPIC.SET]: () => dryerEntity.doCommand(payload),
        [TOPIC.CONFIG]: () => null,
        [TOPIC.STATE]: () => null,
    }

    const command = commands[topic];

    if (!command) {
        throw new Error(`Unknown ${topic} ${payload}`)
    }

    command();
});


mqttClient.on('error', err => console.error(err));

