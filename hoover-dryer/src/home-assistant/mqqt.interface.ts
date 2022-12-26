export enum TOPIC {
    CONFIG ='homeassistant/switch/dryer/config',
    STATE = 'homeassistant/switch/dryer/state',
    SET =   'homeassistant/switch/dryer/set',
}

export enum PAYLOAD {
    ONLINE = "online",
    OFFLINE = "offline",
    STATE_RUNNING = "ON",
    STATE_STANDBY = "OFF"
}
