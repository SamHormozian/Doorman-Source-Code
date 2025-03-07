import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {AppConfig} from "../app.config";
import {LoaderService} from "../services/loader.service";
import {EventService} from "../services/event.service";
import {RestApiService} from "../services/rest-api.service";
import { NavController} from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-rate-attendees-listing',
  templateUrl: './rate-attendees-listing.page.html',
  styleUrls: ['./rate-attendees-listing.page.scss'],
})
export class RateAttendeesListingPage implements OnInit {
  eventId: any = "";
  userId: any = "";
  attendeesList: any = [];
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
    
    this.eventId = this.activatedRoute.snapshot.paramMap.get('event_id');
    this.storage.get("USER_ID").then((res) => {
        if(res){
          this.userId = res;
        }
    });

    if(this.eventId != ""){
      this.getAttendees();
    }
  }

  getAttendees(){
    this.loaderService.showLoader(AppConfig.LOADER_TEXT);
    let params = {
      "event_id": this.eventId,
      "user_id": this.userId
    };
    this.restApi.post("get_attendees.php", params).subscribe((data: any) => {
        this.loaderService.dismissLoader();
        if (data.response.success == 1) {
            this.attendeesList = data.response.attendees_list;
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
