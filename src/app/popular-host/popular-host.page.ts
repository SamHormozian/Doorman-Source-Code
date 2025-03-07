import { Component, OnInit, ViewChild } from '@angular/core';
import {AppConfig} from "../app.config";
import {LoaderService} from "../services/loader.service";
import {EventService} from "../services/event.service";
import {RestApiService} from "../services/rest-api.service";
import { NavController} from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-popular-host',
  templateUrl: './popular-host.page.html',
  styleUrls: ['./popular-host.page.scss'],
})
export class PopularHostPage{
  isFilter = false;
  hostList: any = [];
  userId: any = "";
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
          this.getPopularHost(res);
        }
    });
  }

  getPopularHost(userId){
    this.loaderService.showLoader(AppConfig.LOADER_TEXT);
    let params = {
      "user_id": userId
    };
    this.restApi.post("get_popular_host.php", params).subscribe((data: any) => {
        this.loaderService.dismissLoader();
        if (data.response.success == 1) {
            this.hostList = data.response.popular_hosts;
        }
        else {
            // this.loaderService.showToast(data.response.message);
        }
    }, err => {
        this.loaderService.dismissLoader();
        this.loaderService.showToast(AppConfig.API_ERROR);
    });
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
