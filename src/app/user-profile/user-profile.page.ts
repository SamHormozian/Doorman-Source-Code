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
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage{
  isPageType:any = "0";
  sliderConfig = {
	  initialSlide: 0,
	  slidesPerView: 1,
	  pagination: true,
	  spaceBetween: 0
  	}
  userId:any = "";
  userData:any = [];
  userImages:any = [];
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
    this.isPageType = this.activatedRoute.snapshot.paramMap.get('page_type'); 

    this.storage.get("USER_ID").then((res) => {
        if(res){
          this.userId = res;
          this.getAllImages(res);
        }
    });

    this.storage.get("USER_DATA").then((res) => {
        if(res){
          this.userData = res;
        }
    });


  }

  getAllImages(user_id){
    this.loaderService.showLoader(AppConfig.LOADER_TEXT);
    let params = {
      "user_id": user_id
    };
    this.restApi.post("get_all_user_images.php", params).subscribe((data: any) => {
        this.loaderService.dismissLoader();
        if (data.response.success == 1) {
            this.userImages = data.response.user_image_list;
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
    if(this.isPageType == '0'){
      this.navController.navigateBack(['tabs/tabs/home']);
    }
    else{
      this.navController.navigateBack(['tabs/tabs/settings']);
    }
  }
}
