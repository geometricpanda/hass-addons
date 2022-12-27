import {Dryer} from "../dryer";
import {Device, PAYLOAD} from "../interfaces";
import {filter, Subject} from "rxjs";
import {SelectEntity} from "./select.entity";
import {$connection, $message} from "../events";

export class Select {
    private entity: SelectEntity;
    public readonly node_id: string;
    public readonly device: Device;

    public readonly $action = new Subject<string>();
    public readonly $state = new Subject<string>();

    $connection = $connection.subscribe(() => this.entity.publishConfig())
    
    $commands = $message
        .pipe(filter(({topic}) => topic === this.entity.command_topic))
        .subscribe(({payload}) => this.doSelect(payload));

    constructor(
        private parent: Dryer,
        public readonly id: string,
        public name: string,
        public dryingOptions: Array<string>,
    ) {
        this.node_id = this.parent.node_id;
        this.device = this.parent.device;
        this.entity = new SelectEntity(this, dryingOptions);
    }

    setAvailability(state: boolean) {
        this.entity.setAvailability(state);
    }

    doSelect(state: string) {
        this.$action.next(state);
        this.$state.next(state);
    }
}
