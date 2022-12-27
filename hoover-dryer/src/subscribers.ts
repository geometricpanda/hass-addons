import {mqtt} from "./mqqt";
import {$connection, $message} from "./events";

const onConnect = () => $connection.next();

const onError = (error: Error) => console.error(error);

const onMessage = (topic: string, payload: Buffer) =>
    $message.next({topic, payload: payload.toString()});

mqtt.on('connect', onConnect);
mqtt.on('message', onMessage);
mqtt.on('error', onError);
