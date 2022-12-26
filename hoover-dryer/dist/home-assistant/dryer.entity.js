"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dryerEntity = void 0;
const mqqt_client_1 = require("./mqqt.client");
const mqqt_interface_1 = require("./mqqt.interface");
class DryerEntity {
    async discoveryPublish() {
        const deviceConfig = {
            name: 'Hoover Dryer',
            object_id: 'dryer-state',
            unique_id: '#12345-1',
            command_topic: mqqt_interface_1.TOPIC.SET,
            state_topic: mqqt_interface_1.TOPIC.STATE,
            device: {
                name: "Hoover Dryer - switch",
                manufacturer: "Hoover",
                model: "NDE H10A2 TCE",
                suggested_area: "Kitchen",
                identifiers: "#12345"
            },
            icon: 'mdi:washing-machine',
            payload_available: mqqt_interface_1.PAYLOAD.ONLINE,
            payload_not_available: mqqt_interface_1.PAYLOAD.OFFLINE,
            payload_on: mqqt_interface_1.PAYLOAD.STATE_RUNNING,
            payload_off: mqqt_interface_1.PAYLOAD.STATE_STANDBY,
        };
        return mqqt_client_1.mqqtClient.publish(mqqt_interface_1.TOPIC.CONFIG, JSON.stringify(deviceConfig));
    }
    setState(state) {
        return mqqt_client_1.mqqtClient.publish(mqqt_interface_1.TOPIC.STATE, state);
    }
    doCommand(state) {
        switch (state.toString()) {
            case mqqt_interface_1.PAYLOAD.STATE_RUNNING:
                this.start();
                break;
            case mqqt_interface_1.PAYLOAD.STATE_STANDBY:
                this.end();
                break;
            default:
                console.error(`doCommand: Unknown payload ${state}`);
        }
    }
    start() {
        // TURN THE DRYER ON
        console.log('START DRYING');
        // UPDATE THE STATE
        this.setState(mqqt_interface_1.PAYLOAD.STATE_RUNNING);
    }
    end() {
        // END THE WASH
        console.log('STOP DRYING');
        // UPDATE THE STATE
        this.setState(mqqt_interface_1.PAYLOAD.STATE_STANDBY);
    }
}
exports.dryerEntity = new DryerEntity();
