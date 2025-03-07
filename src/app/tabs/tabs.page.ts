import { Component, OnInit} from '@angular/core';
import { NavController} from '@ionic/angular';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
	selectedTab:any = "home";
  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  setCurrentTab(e) {
    this.selectedTab = e.tab;
    // console.log(this.selectedTab);
  }

  goToSetting(){
    this.navController.navigateBack(['tabs/tabs/settings']);
  }
  goToHome(){
    this.navController.navigateBack(['tabs/tabs/home']);
  }
}
