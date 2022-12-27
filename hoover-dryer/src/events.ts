import {ReplaySubject, Subject} from "rxjs";

export type Message = {
    topic: string;
    payload: any;
}

export const $message = new Subject<Message>();

export const $connection = new ReplaySubject<void>();


// console.info('MESSAGE', topic, payload);
// const commands: Record<TOPIC, () => void> = {
//     [TOPIC.SET]: () => dryerEntity.doCommand(payload),
//     [TOPIC.CONFIG]: () => null,
//     [TOPIC.STATE]: () => null,
// }
//
// const command = commands[topic];
//
// if (!command) {
//     throw new Error(`Unknown ${topic} ${payload}`)
// }
//
// command();

// console.log('CONNECTED');
//
// await dryerEntity.discoveryPublish();
// await dryerEntity.setState(PAYLOAD.STATE_STANDBY);
