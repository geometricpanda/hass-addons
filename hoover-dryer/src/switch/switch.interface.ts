import {Device} from "../interfaces";

export interface SwitchInterface {
    availability?: {
        payload_available?: string;
        payload_not_available?: string;
        topic: string;
        value_template?: string;
    };
    availability_mode?: 'all' | 'any' | 'latest';
    availability_template?: string;
    command_topic?: string;
    device?: Device;
    device_class?: 'outlet' | 'switch'
    enabled_by_default?: boolean;
    icon?: string;
    json_attributes_template?: string;
    json_attributes_topic?: string;
    name?: string;
    object_id?: string;
    optimistic?: boolean;
    payload_off?: string;
    payload_on?: string;
    state_off?: string;
    state_on?: string;
    state_topic?: string;
    unique_id?: string;
    value_template?: string;
}
