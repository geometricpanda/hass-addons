import {Dryer} from "../dryer";
import {SwitchEntity} from "./switch.entity";
import {Device, PAYLOAD} from "../interfaces";
import {$connection, $message} from "../events";
import {filter, Subject} from "rxjs";

export class Switch {

    private entity: SwitchEntity;
    public readonly node_id: string;
    public readonly device: Device;

    public readonly $action = new Subject<boolean>();
    public readonly $state = new Subject<boolean>();

    $connection = $connection.subscribe(() => this.entity.publishConfig())

    $commands = $message
        .pipe(filter(({topic}) => topic === this.entity.command_topic))
        .subscribe(({payload}) =>
            payload === PAYLOAD.STATE_RUNNING
                ? this.doTurnOn()
                : this.doTurnOff());


    constructor(
        private parent: Dryer,
        public readonly id: string,
        public name: string
    ) {
        this.node_id = this.parent.node_id;
        this.device = this.parent.device;
        this.entity = new SwitchEntity(this);
        this.onInit();
    }

    onInit() {


    }

    setAvailability(state: boolean) {
        this.entity.setAvailability(state);
    }

    doTurnOn() {
        this.$action.next(true);
        this.$state.next(true);
    }

    doTurnOff() {
        this.$action.next(false);
        this.$state.next(false);
    }

}
