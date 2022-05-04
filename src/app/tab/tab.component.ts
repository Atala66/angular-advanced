
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TabsComponent } from 'app/tabs/tabs.component';
import { Tab } from './tab.interface';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit, Tab {

  @Output()onClick: EventEmitter<any> =  new EventEmitter<void>();
  @Input() title: string;
  public isActive: boolean = false;

  constructor(
	  // public tabs: TabsComponent
  ) { }

  ngOnInit() {
	  // this.tabs.addTab(this);
    }
	public testContentChild() {
		console.log(' testeando metodo a traves del content child');
	}


	public outputTest() {
		this.onClick.emit();
	}

}
