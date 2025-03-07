import { Component, OnInit, ViewChild } from '@angular/core';
import {AppConfig} from "../app.config";
import {LoaderService} from "../services/loader.service";
import {EventService} from "../services/event.service";
import {RestApiService} from "../services/rest-api.service";
import { NavController} from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-hosting-upcoming-events',
  templateUrl: './hosting-upcoming-events.page.html',
  styleUrls: ['./hosting-upcoming-events.page.scss'],
})
export class HostingUpcomingEventsPage implements OnInit {
  userId: any="";
  eventLists:any = [];
  constructor(
  		private navController: NavController, 
      	public activatedRoute: ActivatedRoute,
      	private loaderService: LoaderService,
      	private eventServices: EventService,
      	private restApi: RestApiService,
      	private storage: StorageService,
      	private route: Router
  	) { }

  ngOnInit() {
  }

  ionViewDidEnter(){ 
    this.storage.get("USER_ID").then((res) => {
        if(res){
          this.userId = res;
          this.getEventList(res);
        }
    });
  }

  getEventList(user_id){
    this.loaderService.showLoader(AppConfig.LOADER_TEXT);
    let params = {
      "user_id": user_id,
      "list_type": "2"
    };
    this.restApi.post("get_setting_event_list.php", params).subscribe((data: any) => {
        this.loaderService.dismissLoader();
        if (data.response.success == 1) {
            this.eventLists = data.response.event_list;
        }
        else {
            this.loaderService.showToast(data.response.message);
        }
    }, err => {
        this.loaderService.dismissLoader();
        this.loaderService.showToast(AppConfig.API_ERROR);
    });
  }
}
