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


  constructor(
	  public timerSrv: TimerService
  ) { }

  ngOnInit(): void {
    this.timerSrv.restartCountdown(this.init);
	this.countdownEndSubscription = this.timerSrv.countdownEnd$.subscribe(() => {
         this.onComplete.emit();
	});
  }


  ngOnDestroy(): void {
	  this.timerSrv.destroyComponent();
	  this.countdownEndSubscription.unsubscribe();
  }

 

}
