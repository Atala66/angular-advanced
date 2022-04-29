import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';



@Injectable()

export class TimerService  {
	private countdownTimerRef: any = null;
	public paused: boolean = true;
	public init: number = 0;
	private countdownEndSource = new Subject<void>();
	public countdownEnd$ = this.countdownEndSource.asObservable(); // $ por convencion
	private countdownSource = new BehaviorSubject<number>(1);
	public countdownSource$ = this.countdownSource.asObservable();

	constructor() {}

	  restartCountdown(init?) {
		if (init) {
			this.init = init;
		}
		if (this.init && this.init > 0) {
		  this.paused = true;
		  this.clearTimeout();
		  this.countdownSource.next(this.init);
		}
	  }
	
	  toogleCountdown() {
		  this.paused = !this.paused;
		  if (this.paused === false) {
			this.doCountdown();
		  } else {
			 this.clearTimeout();
		  }
	  }
	
	  private doCountdown() {
		this.countdownTimerRef = setTimeout(() =>{
		  this.countdownSource.next(this.countdownSource.getValue() - 1 );
		  this.processCountdown();
		}, 1000);
	  }
	
	  private processCountdown() {
		if (this.countdownSource.getValue() <= 0) {
		 this.countdownEndSource.next(); //  emitimos evento con el next() y se lo pasamos al cmp
		  console.log('--countdown end--');
		} else {
		  this.doCountdown();
		}
	  }
	
	  private clearTimeout() {
		if (this.countdownTimerRef) {
		  clearTimeout(this.countdownTimerRef);
		  this.countdownTimerRef = null;
		}
	  }

	  destroyComponent() {
		  this.clearTimeout();
	  }
}

