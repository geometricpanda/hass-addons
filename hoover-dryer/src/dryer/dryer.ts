import {Device} from "../interfaces";
import {Switch} from "../switch";
import {distinctUntilChanged, Subject} from "rxjs";
import {Select} from "../select";

export class Dryer {

    public readonly node_id: string;
    public readonly device: Device;

    public readonly $action = new Subject<string>();
    public readonly $state = new Subject<string>();

    private dryingOptions = [
        'Cotton',
        'Shirts',
        'Wool',
        'Low Heat',
        'Quick Dry'
    ];


    constructor(
        public manufacturer: string,
        public model: string,
        public serialNumber: string,
    ) {
        this.device = {
            name: "Test Dryer",
            suggested_area: "Kitchen",
            manufacturer: this.manufacturer,
            model: this.model,
            identifiers: this.serialNumber,
        };
        this.node_id = `dryer-${serialNumber}`;
        this.onInit();
    }

    onInit() {
        const startStop = new Switch(this, 'start-stop', 'Start / Stop');
        const program = new Select(this, 'program', 'Program', this.dryingOptions);

        startStop.setAvailability(true);
        program.setAvailability(true);

        startStop
            .$action
            .pipe(distinctUntilChanged())
            .subscribe((state: boolean) => {
                // DO THE ON/OFF THING
            })
    }

    doSelect(value: string) {
        this.$action.next(value);
        this.$state.next(value);


    }

}
