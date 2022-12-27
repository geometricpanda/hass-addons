import {mqttClient} from "./mqtt.client";
import {PAYLOAD, TOPIC} from "./mqqt.interface";

class DryerEntity {
    async discoveryPublish() {

        const deviceConfig = {
            name: 'Hoover Dryer',
            object_id: 'dryer-state',
            unique_id: '#12345-1',
            command_topic: TOPIC.SET,
            state_topic: TOPIC.STATE,
            device: {
                name: "Hoover Dryer",
                manufacturer: "Hoover",
                model: "NDE H10A2 TCE",
                suggested_area: "Kitchen",
                identifiers: "#12345"
            },
            icon: 'mdi:washing-machine',
            payload_available: PAYLOAD.ONLINE,
            payload_not_available: PAYLOAD.OFFLINE,
            payload_on: PAYLOAD.STATE_RUNNING,
            payload_off: PAYLOAD.STATE_STANDBY,
        }

        return mqttClient.publish(TOPIC.CONFIG, JSON.stringify(deviceConfig));
    }

    setState(state: PAYLOAD) {
        return mqttClient.publish(TOPIC.STATE, state);
    }

    doCommand(state: PAYLOAD) {
        switch (state.toString()) {
            case PAYLOAD.STATE_RUNNING:
                this.start();
                break;
            case PAYLOAD.STATE_STANDBY:
                this.end();
                break;
            default:
                console.error(`doCommand: Unknown payload ${state}`);
        }
    }

    private start() {
        // TURN THE DRYER ON
        console.log('START DRYING')
        // UPDATE THE STATE
        this.setState(PAYLOAD.STATE_RUNNING);
    }

    private end() {
        // END THE WASH
        console.log('STOP DRYING')
        // UPDATE THE STATE
        this.setState(PAYLOAD.STATE_STANDBY);
    }


}

export const dryerEntity = new DryerEntity();



