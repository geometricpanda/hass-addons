export enum PAYLOAD {
    ONLINE = "online",
    OFFLINE = "offline",
    STATE_RUNNING = "ON",
    STATE_STANDBY = "OFF"
}

export interface Device {
    /**
     * A link to the webpage that can manage the configuration of this device. Can be either an HTTP or HTTPS link.
     */
    configuration_url?: string;
    /**
     * A list of connections of the device to the outside world as a list of tuples
     *  [connection_type, connection_identifier].
     *
     * For example the MAC address of a network interface:
     *  ['mac', '02:5b:26:a8:dc:12'].
     */
    connections?: Array<[string, string]>
    /**
     * The hardware version of the device.
     */
    hw_version?: string;
    /**
     * A list of IDs that uniquely identify the device. For example a serial number.
     */
    identifiers?: string | Array<string>;
    /**
     * The manufacturer of the device.
     */
    manufacturer?: string;
    /**
     * The model of the device.
     */
    model?: string;
    /**
     * The name of the device.
     */
    name?: string;
    /**
     * Suggest an area if the device isn’t in one yet.
     */
    suggested_area?: string;
    /**
     * The firmware version of the device.
     */
    sw_version?: string;
    /**
     * Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are
     * hubs, or parent devices of a sub-device. This is used to show device topology in Home Assistant.
     */
    via_device?: string;
}
