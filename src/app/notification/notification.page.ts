import { Component, OnInit } from '@angular/core';
import {AppConfig} from "../app.config";
import {LoaderService} from "../services/loader.service";
import {EventService} from "../services/event.service";
import {RestApiService} from "../services/rest-api.service";
import { Router } from '@angular/router';
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage {
  userId: any = "";
  userData : any = [];
  is_event_accept_push : any = true;
  is_event_edit_push = true;
  is_event_delete_push = true;
  is_delete_from_event_push = true;
  is_event_add_push = true;
  is_event_accept_email : any = true;
  is_event_edit_email = true;
  is_event_delete_email = true;
  is_delete_from_event_email = true;
  is_event_add_email = true;
  constructor(
  		private loaderService: LoaderService,
      	private eventServices: EventService,
      	private restApi: RestApiService,
      	private storage: StorageService,
		private route: Router
  	) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
  	// this.loaderService.showLoader(AppConfig.LOADER_TEXT);
     this.storage.get("USER_ID").then((res) => {
        if(res){
          this.userId = res;
        }
    });

 	this.storage.get("USER_DATA").then((res) => {
        if(res){
          	// setTimeout(() => {
	      		// this.loaderService.dismissLoader();
		     	this.userData = res;
	      	  	console.log(res);
	    	// }, 2000);
          if(res.userNotification.is_event_accept_push == 'No'){
            this.is_event_accept_push = false;
          }
          if(res.userNotification.is_event_edit_push == 'No'){
            this.is_event_edit_push = false;
          }
          if(res.userNotification.is_event_delete_push == 'No'){
            this.is_event_delete_push = false;
          }
          if(res.userNotification.is_delete_from_event_push == 'No'){
            this.is_delete_from_event_push = false;
          }
          if(res.userNotification.is_event_add_push == 'No'){
            this.is_event_add_push = false;
          }

          if(res.userNotification.is_event_accept_email == 'No'){
            this.is_event_accept_email = false;
          }
          if(res.userNotification.is_event_edit_email == 'No'){
            this.is_event_edit_email = false;
          }
          if(res.userNotification.is_event_delete_email == 'No'){
            this.is_event_delete_email = false;
          }
          if(res.userNotification.is_delete_from_event_email == 'No'){
            this.is_delete_from_event_email = false;
          }
          if(res.userNotification.is_event_add_email == 'No'){
            this.is_event_add_email = false;
          }
        }
    });
  }

  changeUserNotification(ev, notification_type){
    this.loaderService.showLoader(AppConfig.LOADER_TEXT);
    let params = {
      "notification_type": notification_type,
      "notification_status": ev.detail.checked,
      "user_id": this.userId
    };
    this.restApi.post("update_user_notification.php", params).subscribe((data: any) => {
        this.loaderService.dismissLoader();
        if (data.response.success == 1) {
            this.storage.set("USER_DATA", data.response.userData);
        }
        else {
            // this.loaderService.showToast(data.response.message);
        }
    }, err => {
        this.loaderService.dismissLoader();
        this.loaderService.showToast(AppConfig.API_ERROR);
    });
  }

}
