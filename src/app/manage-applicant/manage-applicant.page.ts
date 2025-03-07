import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {AppConfig} from "../app.config";
import {LoaderService} from "../services/loader.service";
import {EventService} from "../services/event.service";
import {RestApiService} from "../services/rest-api.service";
import { NavController} from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-manage-applicant',
  templateUrl: './manage-applicant.page.html',
  styleUrls: ['./manage-applicant.page.scss'],
})
export class ManageApplicantPage implements OnInit {
  eventId: any = "";
  userId: any = "";
  applicantLists: any = [];
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
      this.getEventApplicants();
    }
  }

  getEventApplicants(){
    this.loaderService.showLoader(AppConfig.LOADER_TEXT);
    let params = {
      "event_id": this.eventId,
      "user_id": this.userId
    };
    this.restApi.post("get_all_event_applicants.php", params).subscribe((data: any) => {
        this.loaderService.dismissLoader();
        if (data.response.success == 1) {
            this.applicantLists = data.response.applicant_list;
        }
        else {
            this.loaderService.showToast(data.response.message);
        }
    }, err => {
        this.loaderService.dismissLoader();
        this.loaderService.showToast(AppConfig.API_ERROR);
    });
  }

  doSendNotification(applicant_id:any="", type:any=""){
    this.loaderService.showLoader("Sending notification. Please wait...");
    let params = {
      "event_id": this.eventId,
      "applicant_id": applicant_id,
      "type": type,
    };
    this.restApi.post("do_send_event_update_notification.php", params).subscribe((data: any) => {
        this.loaderService.dismissLoader();
        if (data.response.success == 1) {
            this.loaderService.showToast(data.response.message);
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
