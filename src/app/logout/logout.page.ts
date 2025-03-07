import { Component, OnInit } from '@angular/core';
import {AppConfig} from "../app.config";
import {LoaderService} from "../services/loader.service";
import {EventService} from "../services/event.service";
import {RestApiService} from "../services/rest-api.service";
import { Router } from '@angular/router';
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage{

  constructor(
	  	private loaderService: LoaderService,
	  	private eventServices: EventService,
	  	private restApi: RestApiService,
	    private storage: StorageService,
	  	private route: Router
  	) { }

  ngOnInit() {
  }

  logout(){
  	this.storage.remove("USER_ID");
	this.storage.remove("USER_DATA");
	this.route.navigate(['./landing']);
  }

}
