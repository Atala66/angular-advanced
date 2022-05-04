import {
	AfterContentInit, Component,
	ContentChild,
	ContentChildren,
	QueryList,
	OnDestroy,
	OnInit
} from '@angular/core';
import { TabComponent } from 'app/tab/tab.component';
import { Subscription } from 'rxjs/Subscription';
import { Tab } from '../tab/tab.interface';


@Component({
	selector: 'app-tabs',
	templateUrl: './tabs.component.html',
	styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterContentInit, OnDestroy {

	// @ContentChild(TabComponent)  tab: TabComponent;
	// public tabSubscription: Subscription = null;

	/**
	 *  (reaprovechamos esta variable para el content children)
	 * public tabs: [] = [];
	 */

	@ContentChildren(TabComponent) public tabs: QueryList<TabComponent>;
	public tabSubscriptions: Array<Subscription> = [];

	constructor() { }

	ngOnInit() { }

	ngOnDestroy(): void {
		if(this.tabSubscriptions) {
			this.tabSubscriptions.forEach(subscription => {
                subscription.unsubscribe();
			});
		}
         // Si esto fuera contentChild
		// if (this.tabSubscription) {
		// 	this.tabSubscription.unsubscribe();
		// }
	}

	ngAfterContentInit(): void {
		if (this.tabs) {
			console.log(this.tabs);
			this.tabs.forEach(tab => {
		// cogemos la referencia a la subscripción
			let subscription =	tab.onClick.subscribe(() => {
					console.log(`tab ${tab.title} content is clicked`);
				});
				this.tabSubscriptions.push(subscription);
			});
		this.selectTab(this.tabs.first);
		}
		// 	console.log('elemento ::', this.tab);
		// 	console.log('elemento-metodo ::', this.tab.testContentChild());
		//     this.tabSubscription = this.tab.onClick.subscribe(() => {
		//     console.log('elemento-output: este es el output click');
		// 	});
		//   }

	}


	selectTab(tab: Tab) {
	   this.tabs.forEach((tab: Tab) => { tab.isActive = false; });
	   tab.isActive = true;

	}

    //   CON EL @ContentChildren ya no necesitaria esta funcion.
	//   addTab(tab: Tab) {
	//     if (this.tabs.length === 0) {
	//       tab.isActive = true;
	//     }
	//     this.tabs.push(tab);
	//   }

}
