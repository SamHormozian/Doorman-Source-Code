import { Component, OnInit } from '@angular/core';
import {AppConfig} from "../app.config";
import {LoaderService} from "../services/loader.service";
import {EventService} from "../services/event.service";
import {RestApiService} from "../services/rest-api.service";
import { Router, ActivatedRoute } from '@angular/router';
import {StorageService} from "../services/storage.service";
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-rate-host',
  templateUrl: './rate-host.page.html',
  styleUrls: ['./rate-host.page.scss'],
})
export class RateHostPage implements OnInit {
  host_id:any = "";
  hostDetails:any = [];
  hostRatingDetails:any = [];
  rating: number = 0;
  comment:any = "";
  userId:any = "";
  isPageType:any = "0";
  constructor(
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
  	this.rating = 0;
  	this.comment = '';
    this.host_id = this.activatedRoute.snapshot.paramMap.get('host_id');
    this.isPageType = this.activatedRoute.snapshot.paramMap.get('page_type'); 
    if(this.host_id > 0){
      this.getHostDetails();
    }

    this.storage.get("USER_ID").then((res) => {
        if(res){
          this.userId = res;
        }
    });
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

  starClicked(i:number){
	this.rating = i;
  }

  doSubmitReview(){
  	if(this.comment == ''){
  		this.loaderService.showToast("Please enter reason for rating");
  	}
  	else{
  		this.loaderService.showLoader(AppConfig.LOADER_TEXT);
	    let params = {
	      "host_id": this.host_id,
	      "rate_from": this.userId,
	      "rating": this.rating,
	      "comment": this.comment
	    };
	    this.restApi.post("add_host_rating.php", params).subscribe((data: any) => {
	        this.loaderService.dismissLoader();
	        if (data.response.success == 1) {
	            this.loaderService.showToast(data.response.message);
	            this.route.navigate(['./host-profile/'+this.host_id+'/'+this.isPageType]);
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
}
