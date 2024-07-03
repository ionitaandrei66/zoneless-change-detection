import {ChangeDetectorRef, Component, OnInit, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {interval} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, FormsModule, AsyncPipe],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    counter = 0;
    intervalCounter = 0;
    counter$ = interval(1000);
    counterSignal = signal(0);

    constructor(private cd: ChangeDetectorRef) {
        // this.cd.detach()
        // For detach to trigger the refresh use cd.detectChanges()
    }

    ngOnInit() {
        setInterval(() => {
            this.intervalCounter++;
            // With mark you refresh the component/ why to use mark?
            // because you are zoneless and that means angular will not trigger the refresh
            // for async code
            // this.cd.markForCheck();
        }, 1000)
    }

    increment() {
        this.counter++;
    }

    incrementSignal() {
        this.counterSignal.update(value => value + 1);
    }
}
