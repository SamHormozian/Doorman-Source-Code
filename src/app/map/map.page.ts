import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {AppConfig} from "../app.config";
import {LoaderService} from "../services/loader.service";
import {EventService} from "../services/event.service";
import {RestApiService} from "../services/rest-api.service";
import { NavController} from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import {StorageService} from "../services/storage.service";

import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);

declare var google;
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage {

  @ViewChild('map_canvas', { static: true }) mapElement: ElementRef;
  map: any;
  address: string;
  userId:any = "";
  userLatitude: any = "";
  userLongitude: any = "";
  markers: any = [];
  userData : any = [];
  eventLists : any = [];
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

    this.storage.get("USER_DATA").then((res) => {
        if(res){
          console.log(res);
          this.userData = res;
        }
    });

    this.storage.get("USER_POSITION").then((data) => {
        if(data){
          this.userLatitude = data.latitude;
          this.userLongitude = data.longitude;
          // setTimeout(() => {
            // this.loadMap();
          // }, 1000);
          
        }
    }); 

    this.storage.get("USER_ID").then((res) => {
        if(res){
          this.userId = res;
          this.getAllEvents(res);
        }
    });
  }

  getAllEvents(user_id){
      this.loaderService.showLoader(AppConfig.LOADER_TEXT);
      let params = {
        "user_id": user_id
      };
      this.restApi.post("get_map_events.php", params).subscribe((data: any) => {
          this.loaderService.dismissLoader();
          if (data.response.success == 1) {
              this.eventLists = data.response.events;
              // this.loadMap();
          }
          else {
              // this.loaderService.showToast(data.response.message);
          }
          this.loadMap();
      }, err => {
          this.loaderService.dismissLoader();
          this.loaderService.showToast(AppConfig.API_ERROR);
      });
    }
  loadMap() {
    // this.geolocation.getCurrentPosition().then((resp) => {

      // this.latitude = resp.coords.latitude;
      // this.longitude = resp.coords.longitude;

      // let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let latLng = new google.maps.LatLng(this.userLatitude, this.userLongitude);
      let mapOptions = {
        center: latLng,
        zoom: 11,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        zoomControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      // this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker(this.map);

      /*this.map.addListener('dragend', () => {

        this.latitude = this.map.center.lat();
        this.longitude = this.map.center.lng();

        // this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      });*/

    /*}).catch((error) => {
      console.log('Error getting location', error);
    });*/
  }

  addMarker(map:any){
    let userImg = this.userData.profile_pic;
    console.log(userImg);
  	let markerIcon = {
  	};

  	let marker1 = new google.maps.Marker({
  	  map: map,
  	  animation: google.maps.Animation.DROP,
  	  icon:{
  	  	url: userImg,
        size: new google.maps.Size(50, 50),
        scaledSize: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0,0)
  	  },
  	  position: map.getCenter()
  	});

  	/*let marker2 = new google.maps.Marker({
  	  map: map,
  	  animation: google.maps.Animation.DROP,
  	  icon:{
  	  	url: '../assets/images/party_marker_icon.png',
  	  	size:{
  	  		height: 46,
  	  		width: 40
  	  	}
  	  },
	   position: new google.maps.LatLng('40.760610', '-73.995242')
	});*/

  /*for(let i = 0; i < this.eventLists.length; i++) {
    
  }*/

	this.markers.push(marker1);
	// this.markers.push(marker2);
	// let content = "";
	// this.addInfoWindow(this.markers, content);
  }
  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  /*getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords " + lattitude + " " + longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0)
            responseAddress.push(value);

        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value + ", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = "Address Not Available!";
      });

  }*/

}
