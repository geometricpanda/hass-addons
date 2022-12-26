(() => {
    const defines = {};
    const entry = [null];
    function define(name, dependencies, factory) {
        defines[name] = { dependencies, factory };
        entry[0] = name;
    }
    define("require", ["exports"], (exports) => {
        Object.defineProperty(exports, "__cjsModule", { value: true });
        Object.defineProperty(exports, "default", { value: (name) => resolve(name) });
    });
    var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }));
    var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
        o["default"] = v;
    });
    var __importStar = (this && this.__importStar) || function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    };
    define("home-assistant/credentials", ["require", "exports", "dotenv"], function (require, exports, dotenv) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.MQTT_CREDENTIALS = void 0;
        dotenv = __importStar(dotenv);
        dotenv.config();
        const { MQTT_HOST, MQTT_PORT, MQTT_USERNAME, MQTT_PASSWORD, } = process.env;
        exports.MQTT_CREDENTIALS = {
            host: MQTT_HOST,
            port: MQTT_PORT ? +MQTT_PORT : undefined,
            username: MQTT_USERNAME,
            password: MQTT_PASSWORD,
        };
    });
    define("home-assistant/mqqt.client", ["require", "exports", "async-mqtt", "home-assistant/credentials"], function (require, exports, async_mqtt_1, credentials_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.mqqtClient = void 0;
        exports.mqqtClient = (0, async_mqtt_1.connect)(credentials_1.MQTT_CREDENTIALS);
    });
    define("home-assistant/mqqt.interface", ["require", "exports"], function (require, exports) {
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
    });
    define("home-assistant/dryer.entity", ["require", "exports", "home-assistant/mqqt.client", "home-assistant/mqqt.interface"], function (require, exports, mqqt_client_1, mqqt_interface_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports.dryerEntity = void 0;
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
    });
    define("main", ["require", "exports", "home-assistant/mqqt.client", "home-assistant/dryer.entity", "home-assistant/mqqt.interface"], function (require, exports, mqqt_client_2, dryer_entity_1, mqqt_interface_2) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        mqqt_client_2.mqqtClient.on('connect', async () => {
            await mqqt_client_2.mqqtClient.subscribe('presence');
            await mqqt_client_2.mqqtClient.subscribe(mqqt_interface_2.TOPIC.SET);
            await dryer_entity_1.dryerEntity.discoveryPublish();
            await dryer_entity_1.dryerEntity.setState(mqqt_interface_2.PAYLOAD.STATE_STANDBY);
        });
        mqqt_client_2.mqqtClient.on('message', (_topic, _payload) => {
            const topic = _topic.toString();
            const payload = _payload.toString();
            const commands = {
                [mqqt_interface_2.TOPIC.SET]: () => dryer_entity_1.dryerEntity.doCommand(payload),
                [mqqt_interface_2.TOPIC.CONFIG]: () => null,
                [mqqt_interface_2.TOPIC.STATE]: () => null,
            };
            const command = commands[topic];
            if (!command) {
                throw new Error(`Unknown ${topic} ${payload}`);
            }
            command();
        });
        mqqt_client_2.mqqtClient.on('error', err => console.error(err));
    });
    
    'marker:resolver';

    function get_define(name) {
        if (defines[name]) {
            return defines[name];
        }
        else if (defines[name + '/index']) {
            return defines[name + '/index'];
        }
        else {
            const dependencies = ['exports'];
            const factory = (exports) => {
                try {
                    Object.defineProperty(exports, "__cjsModule", { value: true });
                    Object.defineProperty(exports, "default", { value: require(name) });
                }
                catch {
                    throw Error(['module "', name, '" not found.'].join(''));
                }
            };
            return { dependencies, factory };
        }
    }
    const instances = {};
    function resolve(name) {
        if (instances[name]) {
            return instances[name];
        }
        if (name === 'exports') {
            return {};
        }
        const define = get_define(name);
        if (typeof define.factory !== 'function') {
            return define.factory;
        }
        instances[name] = {};
        const dependencies = define.dependencies.map(name => resolve(name));
        define.factory(...dependencies);
        const exports = dependencies[define.dependencies.indexOf('exports')];
        instances[name] = (exports['__cjsModule']) ? exports.default : exports;
        return instances[name];
    }
    if (entry[0] !== null) {
        return resolve(entry[0]);
    }
})();