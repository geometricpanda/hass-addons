import {mqtt} from "../mqqt";
import {Switch} from "./switch";
import {SwitchInterface} from "./switch.interface";
import {PAYLOAD} from "../interfaces";

export class SwitchEntity {
    public readonly topic: string;
    public readonly availability_topic: string;
    public readonly command_topic: string;
    public readonly config_topic: string;
    public readonly state_topic: string;


    constructor(private parent: Switch) {
        this.topic = `homeassistant/switch/${this.parent.node_id}/${this.parent.id}`
        this.availability_topic = `${this.topic}/availability`;
        this.command_topic = `${this.topic}/command`;
        this.config_topic = `${this.topic}/config`;
        this.state_topic = `${this.topic}/state`;

        mqtt.subscribe(this.command_topic);

        this.onInit();
    }

    onInit() {
        this.parent.$state.subscribe((state: boolean) => this.setState(state));

    }

    publishConfig() {
        const deviceConfig: SwitchInterface = {
            availability: {
                topic: this.availability_topic,
                payload_available: PAYLOAD.ONLINE,
                payload_not_available: PAYLOAD.OFFLINE,
            },
            name: this.parent.name,
            command_topic: this.command_topic,
            device: this.parent.device,
            enabled_by_default: true,
            icon: 'mdi:washing-machine',
            payload_on: PAYLOAD.STATE_RUNNING,
            payload_off: PAYLOAD.STATE_STANDBY,
            state_topic: this.state_topic,
            unique_id: this.parent.id,
        }

        const payload = JSON.stringify(deviceConfig);
        mqtt.publish(this.config_topic, payload);
    }

    setAvailability(state: boolean) {
        const payload = state ? PAYLOAD.ONLINE : PAYLOAD.OFFLINE;
        mqtt.publish(this.availability_topic, payload);
    }

    setState(state: boolean) {
        const payload = state ? PAYLOAD.STATE_RUNNING : PAYLOAD.STATE_STANDBY;
        mqtt.publish(this.state_topic, payload);
    }
}
