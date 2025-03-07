import { Component, OnInit, ViewChild } from '@angular/core';
import {AppConfig} from "../app.config";
import {LoaderService} from "../services/loader.service";
import {EventService} from "../services/event.service";
import {RestApiService} from "../services/rest-api.service";
import { Router } from '@angular/router';
import {StorageService} from "../services/storage.service";


import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('eventSlider') eventSlider: any;
  @ViewChild('categorySlider') categorySlider: any;
  @ViewChild('hostSlider') hostSlider: any;
  animationInProgress = false;

  	eventSliderConfig = {
	  initialSlide: 0,
	  slidesPerView: 1,
	  loop: true,
	  pagination: true,
	  spaceBetween: 2,
	  // speed: 1000,
	  autoplay: true
	}
	/*categorySliderConfig = {
	  initialSlide: 0,
	  slidesPerView: 3,
	  spaceBetween: 2
	}
	hostSliderConfig = {
	  initialSlide: 0,
	  slidesPerView: 2,
	  spaceBetween: 2
	}*/
  upcomingEvents : any = [];
  popularHosts : any = [];
  categoryLists : any = [];
  userData : any = [];
  searchData : any = [];
  userId: any = "";
  userLatitude: any = 0; //latitude
  userLongitude: any = 0; //longitude
  
  constructor(
      private loaderService: LoaderService,
      private eventServices: EventService,
      private restApi: RestApiService,
      private storage: StorageService,
      private route: Router
    ) {}

  ngOnInit() {
    
  }

  ionViewDidEnter(){
    // this.startAnimation();
    this.storage.get("USER_POSITION").then((data) => {
        if(data){
          this.userLatitude = data.latitude;
          this.userLongitude = data.longitude;
        }
    }); 

    this.storage.get("USER_ID").then((res) => {
        if(res){
          this.userId = res;
          this.getHomeData(res);
        }
    });

    this.storage.get("USER_DATA").then((res) => {
        if(res){
          this.userData = res;
        }
    });
  }

  startAnimation() {
    if(this.animationInProgress) return;
    this.animationInProgress = true;
    setTimeout(() => {
      this.eventSlider.swiperRef.slideNext(1000);
      this.animationInProgress = false;
      this.startAnimation();
    }, 2000);
  }

  next() {
    this.eventSlider.swiperRef.slideNext(1000);
  }

  getHomeData(user_id){
    this.loaderService.showLoader(AppConfig.LOADER_TEXT);
    let params = {
      "user_id": user_id,
      "user_latitude": this.userLatitude,
      "user_longitude": this.userLongitude
    };
    this.restApi.post("get_home_data.php", params).subscribe((data: any) => {
        this.loaderService.dismissLoader();
        if (data.response.success == 1) {
            this.upcomingEvents = data.response.upcoming_events;
            console.log(this.upcomingEvents);
            this.popularHosts = data.response.popular_hosts;
            this.categoryLists = data.response.categories;
            this.startAnimation();
        }
        else {
            this.loaderService.showToast(data.response.message);
        }
    }, err => {
        this.loaderService.dismissLoader();
        this.loaderService.showToast(AppConfig.API_ERROR);
    });
  }

  searchEventHost(ev){
    // console.log(ev.target.value);
    let srcKeyword = ev.target.value;
    if(srcKeyword != ""){
      let params = {
        "keyword": srcKeyword
      };
      this.restApi.post("get_search_data.php", params).subscribe((data: any) => {
          // this.loaderService.dismissLoader();
          if (data.response.success == 1) {
              this.searchData = data.response.search_data;
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

}
