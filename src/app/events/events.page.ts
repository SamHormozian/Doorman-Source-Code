import { Component, OnInit, ViewChild } from '@angular/core';
import {AppConfig} from "../app.config";
import {LoaderService} from "../services/loader.service";
import {EventService} from "../services/event.service";
import {RestApiService} from "../services/rest-api.service";
import { NavController} from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import {StorageService} from "../services/storage.service";
@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  isFilter = false;
  catID:any = "";
  categoryName:any = "";
  eventLists:any = [];
  isPageType:any = "0";
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
  openFilter(){
  	if(this.isFilter == true){
  		this.isFilter = false;
  	}
  	else
  	{
  		this.isFilter = true;
  	}
  }

  ionViewDidEnter(){
    this.isPageType = this.activatedRoute.snapshot.paramMap.get('page_type'); 
    this.catID = this.activatedRoute.snapshot.paramMap.get('cat_id'); 

    this.storage.get("USER_ID").then((res) => {
        if(res){
          this.userId = res;
          if(this.catID){
            this.getEventsByCat(res);
          }
        }
    });
  }

  backToPrevious(){
    if(this.isPageType == '0'){
      this.navController.navigateBack(['tabs/tabs/home']);
    }
    else{
      this.navController.navigateBack(['tabs/tabs/home/event-categories']);
    }
  }

  getEventsByCat(user_id){
    this.loaderService.showLoader(AppConfig.LOADER_TEXT);
    let params = {
      "cat_id": this.catID,
      "user_id": user_id
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
}
