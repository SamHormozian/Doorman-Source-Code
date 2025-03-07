import { Component, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  @ViewChild('upcomingEventSlider') upcomingEventSlider: any;
  @ViewChild('hostingEventSlider') hostingEventSlider: any;
  // @ViewChild('categorySlider') categorySlider: any;
  // @ViewChild('hostSlider') hostSlider: any;
  animationInProgress = false;

	upcomingEventSliderConfig = {
	  initialSlide: 0,
	  slidesPerView: 1,
	  spaceBetween: 2
	}
	hostingEventSliderConfig = {
	  initialSlide: 0,
	  slidesPerView: 1,
	  spaceBetween: 2
	}

	hostSliderConfig = {
	  initialSlide: 0,
	  slidesPerView: 2,
	  spaceBetween: 2
	}
	userId:any = "";
	attendingUpcomingEvents : any = [];
	hostingUpcomingEvents : any = [];
	prevEventsAttended : any = [];
	prevEventsHosted : any = [];
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
          this.getSettingData(res);
        }
    });
  }

  getSettingData(user_id){
    this.loaderService.showLoader(AppConfig.LOADER_TEXT);
    let params = {
      "user_id": user_id
    };
    this.restApi.post("get_setting_data.php", params).subscribe((data: any) => {
        this.loaderService.dismissLoader();
        if (data.response.success == 1) {
            this.attendingUpcomingEvents = data.response.attending_upcoming_events;
            this.hostingUpcomingEvents = data.response.hosting_upcoming_events;
            this.prevEventsAttended = data.response.prev_events_attended;
            this.prevEventsHosted = data.response.prev_events_hosted;
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
