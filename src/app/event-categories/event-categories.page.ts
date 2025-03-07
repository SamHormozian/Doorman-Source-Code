import { Component, OnInit, ViewChild } from '@angular/core';
import {AppConfig} from "../app.config";
import {LoaderService} from "../services/loader.service";
import {EventService} from "../services/event.service";
import {RestApiService} from "../services/rest-api.service";
import { Router } from '@angular/router';
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-event-categories',
  templateUrl: './event-categories.page.html',
  styleUrls: ['./event-categories.page.scss'],
})
export class EventCategoriesPage implements OnInit {
   eventCats : any = [];
  constructor(
  	  private loaderService: LoaderService,
      private eventServices: EventService,
      private restApi: RestApiService,
      private storage: StorageService,
      private route: Router
  	) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.getEventCats();
  }

  getEventCats(){
    this.loaderService.showLoader(AppConfig.LOADER_TEXT);
    let params = {};
    this.restApi.post("get_event_category.php", params).subscribe((data: any) => {
        this.loaderService.dismissLoader();
        if (data.response.success == 1) {
            this.eventCats = data.response.categories;
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
