import {mqqtClient} from "./home-assistant/mqqt.client";
import {dryerEntity} from "./home-assistant/dryer.entity";
import {PAYLOAD, TOPIC} from "./home-assistant/mqqt.interface";


mqqtClient.on('connect', async () => {
    await mqqtClient.subscribe('presence');
    await mqqtClient.subscribe(TOPIC.SET);

    await dryerEntity.discoveryPublish();
    await dryerEntity.setState(PAYLOAD.STATE_STANDBY);
});

mqqtClient.on('message', (_topic, _payload) => {
    const topic = _topic.toString() as TOPIC;
    const payload = _payload.toString() as PAYLOAD;

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


mqqtClient.on('error', err => console.error(err));

