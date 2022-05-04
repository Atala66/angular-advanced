import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	public isTimerVisible: boolean;
	public isEndTimerAlertVisible: boolean;
	public time: number;
	public timers: Array<number> = [];

	constructor() {
		this.timers = [85, 65, 45];
	}

	public showAddTimer() {
		this.isTimerVisible = true;
	}

	public hideAddTimer() {
		this.isTimerVisible = false;
	}

	public showEndTimerAlert() {
		console.log('output (onComplete) del app timer');
		this.isEndTimerAlertVisible = true;
	}

	public hideEndTimerAlert() {
		this.isEndTimerAlertVisible = false;
	}


	public submitAddTimer() {
		this.timers.push(this.time);
		this.hideAddTimer();
	}
}
