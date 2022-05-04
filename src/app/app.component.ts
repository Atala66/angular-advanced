import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { SimpleAlertViewComponent } from './simple-alert-view/simple-alert-view.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit, AfterViewInit {
	public isTimerVisible: boolean = false;
	public isEndTimerAlertVisible: boolean;
	public time: number;
	public timers: Array<number> = [];
	// @ViewChild(SimpleAlertViewComponent)  alert: SimpleAlertViewComponent;
	@ViewChildren(SimpleAlertViewComponent) alerts: QueryList<SimpleAlertViewComponent>;

	constructor(
		private cdRef: ChangeDetectorRef
	) {
		this.timers = [12, 65, 45];
	}



	// aqui aún no está disponible la queryList de retorno . error de consola
	ngAfterViewInit(): void {
		this.alerts.forEach((alert) => {
			if (!alert.title) {
				alert.title = 'Hi!!';
				alert.message = 'I am here!!';
			}
		});
		this.cdRef.detectChanges();
	}

	ngAfterContentInit(): void {
	}



	public showAddTimer() {
		this.isTimerVisible = true;
	}

	public hideAddTimer() {
		this.isTimerVisible = false;
	}

	public showEndTimerAlert() {
		console.log('output (onComplete) del app timer');
		this.alerts.first.show(); // metodos de la queryList.
		
	}

	public hideEndTimerAlert() {
		this.isEndTimerAlertVisible = false;
	}


	public submitAddTimer() {
		this.timers.push(this.time);
		this.hideAddTimer();
	}
}
