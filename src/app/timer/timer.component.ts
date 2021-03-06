import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TimerService } from './timer.service';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  providers: [TimerService]
})
export class TimerComponent implements OnInit, OnDestroy {

  @Output() onComplete = new EventEmitter<void>();
  @Input() init: number;
  public countdownEndSubscription: Subscription = null;
  public countdownSubscription: Subscription = null;
  public countdown: number;

   /**
	* *get es un método de acceso a una propiedad y debe devover un valor
	 la propiedad no existe pero es como si existiera ver html
    **/
   get progress( ) {
	return  this.init - this.countdown / this. init * 100;
  }


  constructor(
	  public timerSrv: TimerService
  ) { }

  ngOnInit(): void {
    this.timerSrv.restartCountdown(this.init);
	this.countdownEndSubscription = this.timerSrv.countdownEnd$.subscribe(() => {
         this.onComplete.emit();
	});

	this.countdownSubscription = this.timerSrv.countdownSource$
	.subscribe((data) => {
		// console.log ( 'data calling every time it updates:', data);
		this.countdown = data;
	});
  }


  ngOnDestroy(): void {
	  this.timerSrv.destroyComponent();
	  this.countdownEndSubscription.unsubscribe();
	  this.countdownSubscription.unsubscribe();
  }

 

}
