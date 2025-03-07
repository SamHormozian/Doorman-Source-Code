import { Component, OnInit, ViewChild } from '@angular/core';
import {AppConfig} from "../app.config";
import {LoaderService} from "../services/loader.service";
import {EventService} from "../services/event.service";
import {RestApiService} from "../services/rest-api.service";
import { NavController} from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-event-filter',
  templateUrl: './event-filter.page.html',
  styleUrls: ['./event-filter.page.scss'],
})
export class EventFilterPage implements OnInit {
  isFilter = false;
  catID:any = "";
  filterType:any = "";
  eventLists:any = [];
  categoryName:any = "";
  userLatitude:any = "";
  userLongitude:any = "";
  userId:any = "";
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
    this.storage.get("USER_POSITION").then((data) => {
      console.log(data);
        if(data){
          this.userLatitude = data.latitude;
          this.userLongitude = data.longitude;
        }
    }); 

    this.filterType = this.activatedRoute.snapshot.paramMap.get('filter_type'); 
    this.catID = this.activatedRoute.snapshot.paramMap.get('cat_id');
    this.storage.get("USER_ID").then((res) => {
        if(res){
          this.userId = res;
          /*setTimeout(() => {
            this.getEventsByCat();
          }, 1000);*/
          if(this.catID){
            this.getEventsByCat(res);
          }
        }
    });
  }

  getEventsByCat(user_id){
    this.loaderService.showLoader(AppConfig.LOADER_TEXT);
    let params = {
      "cat_id": this.catID,
      "filter_type": this.filterType,
      "user_id": user_id,
      "user_latitude": this.userLatitude,
      "user_longitude": this.userLongitude
    };
    this.restApi.post("get_event_by_cat.php", params).subscribe((data: any) => {
        this.loaderService.dismissLoader();
        if (data.response.success == 1) {
            this.categoryName = data.response.category_name;
            this.eventLists = data.response.events;
        }
        else {
            // this.loaderService.showToast(data.response.message);
        }
    }, err => {
        this.loaderService.dismissLoader();
        this.loaderService.showToast(AppConfig.API_ERROR);
    });
  }

  backToPrevious(){
    this.navController.back();
  }
  openFilter(){
  	if(this.isFilter == true){
  		this.isFilter = false;
  	}
  	else
  	{
  		this.isFilter = true;
  	}
  }
}
