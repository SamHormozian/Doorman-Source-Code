import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {AppConfig} from "../app.config";
import {LoaderService} from "../services/loader.service";
import {EventService} from "../services/event.service";
import {RestApiService} from "../services/rest-api.service";
import { NavController} from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import {StorageService} from "../services/storage.service";

import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);

@Component({
  selector: 'app-accept-applicant',
  templateUrl: './accept-applicant.page.html',
  styleUrls: ['./accept-applicant.page.scss'],
})
export class AcceptApplicantPage{
  isReviewModalOpen = false;
  sliderConfig = {
	  initialSlide: 0,
	  slidesPerView: 1,
	  pagination: true,
	  spaceBetween: 0
  }
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
      "is_accept": '0',
      "user_id": this.userId
    };
    this.restApi.post("get_event_applicants.php", params).subscribe((data: any) => {
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


  setReviewApplicantOpen(isOpen: boolean) {
    this.isReviewModalOpen = isOpen;
  }

  goToReviewApplicant(){
    this.isReviewModalOpen = false;
    this.loaderService.showLoader(AppConfig.LOADER_TEXT);
    let params = {
      "event_id": this.eventId,
      "user_id": this.userId
    };
    this.restApi.post("accept_event_applicants.php", params).subscribe((data: any) => {
        this.loaderService.dismissLoader();
        if (data.response.success == 1) {
            // this.loaderService.showToast(data.response.message);
            this.route.navigate(['./review-applicants/'+this.eventId]);
        }
        else {
            this.loaderService.showToast(data.response.message);
        }
    }, err => {
        this.loaderService.dismissLoader();
        this.loaderService.showToast(AppConfig.API_ERROR);
    });
    /*setTimeout(() => {
      this.route.navigate(['./review-applicants/'+this.eventId]);
    }, 500);*/
    
  }

  deleteApplicants(){
    this.loaderService.showLoader(AppConfig.LOADER_TEXT);
    let params = {
      "event_id": this.eventId
    };
    this.restApi.post("delete_event_applicant.php", params).subscribe((data: any) => {
        this.loaderService.dismissLoader();
        if (data.response.success == 1) {
            this.loaderService.showToast(data.response.message);
            this.route.navigate(['./edit-event'+this.eventId]);
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
