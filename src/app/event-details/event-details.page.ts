import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {AppConfig} from "../app.config";
import {LoaderService} from "../services/loader.service";
import {EventService} from "../services/event.service";
import {RestApiService} from "../services/rest-api.service";
import { NavController} from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import {StorageService} from "../services/storage.service";
declare var google;
@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage{

  @ViewChild('map_canvas', { static: true }) mapElement: ElementRef;
  map: any;
  address: string;

  latitude: any = "";
  longitude: any = "";
  markers: any = [];
  eventDetails: any = [];
  eventId:any = "";
  userId:any = "";
  userLatitude:any = "";
  userLongitude:any = "";
  isEventApply:any = "0";
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
  	// this.loadMap();
  }

  ionViewDidEnter(){ 
    this.storage.get("USER_POSITION").then((data) => {
        if(data){
          this.userLatitude = data.latitude;
          this.userLongitude = data.longitude;
        }
    }); 

    this.eventId = this.activatedRoute.snapshot.paramMap.get('event_id');
    this.storage.get("USER_ID").then((res) => {
        if(res){
          this.userId = res;
          if(this.eventId){
            this.getEventDetails(res);
          }
        }
    });
  }

  getEventDetails(user_id){
    this.loaderService.showLoader(AppConfig.LOADER_TEXT);
    let params = {
      "event_id": this.eventId,
      "user_id": user_id,
      "user_latitude": this.userLatitude,
      "user_longitude": this.userLongitude
    };
    this.restApi.post("get_event_details.php", params).subscribe((data: any) => {
        this.loaderService.dismissLoader();
        if (data.response.success == 1) {
            this.eventDetails = data.response.event_details;
            this.isEventApply = data.response.is_event_apply;
            this.loadMap();
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
    this.navController.back();
  }

  loadMap() {

      let latLng = new google.maps.LatLng(this.eventDetails.latitude, this.eventDetails.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 13,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        zoomControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.map.addListener('dragend', () => {

        this.latitude = this.map.center.lat();
        this.longitude = this.map.center.lng();
      });
  }

  doApplyEvent(){
    this.loaderService.showLoader(AppConfig.LOADER_TEXT);
    let params = {
      "event_id": this.eventId,
      "user_id": this.userId
    };
    this.restApi.post("do_apply_event.php", params).subscribe((data: any) => {
        this.loaderService.dismissLoader();
        if (data.response.success == 1) {
            this.loaderService.showToast(data.response.message);
            this.isEventApply = "1";
        }
        else {
            this.loaderService.showToast(data.response.message);
            this.isEventApply = "0";
        }
    }, err => {
        this.loaderService.dismissLoader();
        this.loaderService.showToast(AppConfig.API_ERROR);
    });
  }
}
