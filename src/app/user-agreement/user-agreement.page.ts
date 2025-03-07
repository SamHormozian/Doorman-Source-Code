import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {AppConfig} from "../app.config";
import {LoaderService} from "../services/loader.service";
import {EventService} from "../services/event.service";
import {RestApiService} from "../services/rest-api.service";
import { NavController} from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-user-agreement',
  templateUrl: './user-agreement.page.html',
  styleUrls: ['./user-agreement.page.scss'],
})
export class UserAgreementPage implements OnInit {
  contentData: any = [];
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
    this.getContentData();
  }

  getContentData(){
    this.loaderService.showLoader(AppConfig.LOADER_TEXT);
    let params = {};
    this.restApi.post("get_content.php", params).subscribe((data: any) => {
        this.loaderService.dismissLoader();
        if (data.response.success == 1) {
            this.contentData = data.response.content;
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
