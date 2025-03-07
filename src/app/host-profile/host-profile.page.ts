import { Component, OnInit } from '@angular/core';
import {AppConfig} from "../app.config";
import {LoaderService} from "../services/loader.service";
import {EventService} from "../services/event.service";
import {RestApiService} from "../services/rest-api.service";
import { Router, ActivatedRoute } from '@angular/router';
import {StorageService} from "../services/storage.service";
import { ActionSheetController, NavController } from '@ionic/angular';


import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);

@Component({
  selector: 'app-host-profile',
  templateUrl: './host-profile.page.html',
  styleUrls: ['./host-profile.page.scss'],
})
export class HostProfilePage{
	sliderConfig = {
	  initialSlide: 0,
	  slidesPerView: 1,
	  pagination: true,
	  spaceBetween: 0
  	}
    host_id:any = "";
    hostDetails:any = [];
    hostRatingDetails:any = [];
    isPageType:any = "0";
    hostImages:any = [];
  constructor(
      private navController: NavController,
      private loaderService: LoaderService,
      private eventServices: EventService,
      private restApi: RestApiService,
      private storage: StorageService,
      private actionSheetCtrl: ActionSheetController,
      public activatedRoute: ActivatedRoute,
      private route: Router
    ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.host_id = this.activatedRoute.snapshot.paramMap.get('host_id');
    this.isPageType = this.activatedRoute.snapshot.paramMap.get('page_type'); 
    if(this.host_id > 0){
      this.getHostDetails();
    }
  }

  getHostDetails(){
    this.loaderService.showLoader(AppConfig.LOADER_TEXT);
    let params = {
      "host_id": this.host_id
    };
    this.restApi.post("get_host_details.php", params).subscribe((data: any) => {
        this.loaderService.dismissLoader();
        if (data.response.success == 1) {
            this.hostDetails = data.response.host_details;
            this.hostImages = data.response.user_image_list;
            this.hostRatingDetails = data.response.host_details.host_rating;
        }
        else {
            this.loaderService.showToast(data.response.message);
        }
    }, err => {
        this.loaderService.dismissLoader();
        this.loaderService.showToast(AppConfig.API_ERROR);
    });
  }

  backToPrevious(){
    if(this.isPageType == '1'){
      this.navController.navigateBack(['tabs/tabs/home/popular-host']);
    }
    else
    {
      this.navController.navigateBack(['tabs/tabs/home']);
    }
    
  }

}
