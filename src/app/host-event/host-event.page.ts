import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {AppConfig} from "../app.config";
import {LoaderService} from "../services/loader.service";
import {EventService} from "../services/event.service";
import {RestApiService} from "../services/rest-api.service";
import { Router } from '@angular/router';
import {StorageService} from "../services/storage.service";
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import {FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-host-event',
  templateUrl: './host-event.page.html',
  styleUrls: ['./host-event.page.scss'],
})
export class HostEventPage{
  startDate: any = "text";
  endDate: any = "text";
  startTime: any = "text";
  endTime: any = "text";
  isEventType = false;
  hostEventForm: FormGroup;
  isSubmitted = false;
  categoryLists: any = [];
  uperAgeLimit: any = "0";
  lowerAgeLimit: any = "0";
  userId: any = "";
  eventCatId: any = "";
  imageSourcePath: any = "";
  constructor(
      public formBuilder: FormBuilder,
      private loaderService: LoaderService,
      private eventServices: EventService,
      private restApi: RestApiService,
      private storage: StorageService,
      private actionSheetCtrl: ActionSheetController,
      private camera: Camera,
      private transfer: FileTransfer,
      private file: File,
      private route: Router
    ) { }

  ngOnInit() {
    this.hostEventForm = this.formBuilder.group({
      event_category: ['', [Validators.required]],
      event_name: ['', [Validators.required]],
      event_description: ['', [Validators.required]],
      event_capacity: ['', [Validators.required]],
      event_rules: ['', [Validators.required]],
      event_start_date: ['', [Validators.required]],
      event_end_date: ['', [Validators.required]],
      event_start_time: ['', [Validators.required]],
      event_end_time: ['', [Validators.required]],
      event_location: ['', [Validators.required]]
    })
  }

  ionViewDidEnter(){
     this.storage.get("USER_ID").then((res) => {
        if(res){
          this.userId = res;
        }
    });
    this.getCategories();
  }

  getCategories(){
    // this.loaderService.showLoader(AppConfig.LOADER_TEXT);
    let params = {};
    this.restApi.post("get_event_category.php", params).subscribe((data: any) => {
        // this.loaderService.dismissLoader();
        if (data.response.success == 1) {
            this.categoryLists = data.response.categories;
        }
        else {
            // this.loaderService.showToast(data.response.message);
        }
    }, err => {
        // this.loaderService.dismissLoader();
        // this.loaderService.showToast(AppConfig.API_ERROR);
    });
  }

  setEventType(cat_id, cat_name){
    this.hostEventForm.controls['event_category'].setValue(cat_name);
    this.eventCatId = cat_id;
    this.isEventType = false;
  }

  ageLimit(ev){
    console.log(ev);
    this.uperAgeLimit = ev.detail.value.upper;
    this.lowerAgeLimit = ev.detail.value.lower;
  }

  changeStartDateType(){
  	this.startDate = "date";
  }
  changeEndDateType(){
  	this.endDate = "date";
  }
  changeStartTimeType(){
  	this.startTime = "time";
  }
  changeEndTimeType(){
  	this.endTime = "time";
  }

  showEventType(){
    if(this.isEventType == false){
      this.isEventType = true;
    }
    else
    {
      this.isEventType = false;
    }
  }

  get errorControl() {
    return this.hostEventForm.controls;
  }

  doSubmitForm() {
    this.isSubmitted = true;
    if (!this.hostEventForm.valid) {
      this.loaderService.showToast("Please provide all the required values!");
      return false;
    } else {
      let eventData = {
          "event_host_id"       : this.userId,
          "event_category"      : this.eventCatId,
          "event_name"          : this.hostEventForm.value.event_name,
          "event_description"   : this.hostEventForm.value.event_description,
          "event_age_limit"     : this.lowerAgeLimit+'-'+this.uperAgeLimit,
          "event_capacity"      : this.hostEventForm.value.event_capacity,
          "event_rules"         : this.hostEventForm.value.event_rules,
          "event_start_date"    : this.hostEventForm.value.event_start_date,
          "event_end_date"      : this.hostEventForm.value.event_end_date,
          "event_start_time"    : this.hostEventForm.value.event_start_time,
          "event_end_time"      : this.hostEventForm.value.event_end_time,
          "event_location"      : this.hostEventForm.value.event_location
      }
      this.loaderService.showLoader(AppConfig.LOADER_TEXT);
      this.restApi.post("post_event.php", eventData).subscribe((data: any) => {
          // this.loaderService.dismissLoader();
          if (data.response.success == 1) {
              this.uploadHostEventImage(data);
          }
          else {
              this.loaderService.dismissLoader();
              this.loaderService.showToast(data.response.message);
          }
      }, err => {
          this.loaderService.dismissLoader();
          this.loaderService.showToast(AppConfig.API_ERROR);
      });
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image Source',
      subHeader: '',
      buttons: [
        {
          text: 'Load from Library',
           handler: () => {
            this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        },
      ],
    });
    await actionSheet.present();
  }

  pickImage(sourceType) {
    console.log("sourceType.....", sourceType);
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      this.imageSourcePath = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  uploadHostEventImage(data){
    if(this.imageSourcePath != ""){
      const fileTransfer: FileTransferObject = this.transfer.create();
      let options: FileUploadOptions         = {
          fileKey    : 'file',
          fileName   : 'event_cover_image',
          chunkedMode: false,
          mimeType   : "image/jpeg",
          params     : {
              "event_id"     : data.response.event_id,
              "securitykey": AppConfig.SECURITY_TOKEN
          },
          headers    : {}
      };
      console.log(options);
      fileTransfer.upload(this.imageSourcePath, AppConfig.API_URL + '/upload_event_cover.php', options)
      .then((result: any) => {
          this.loaderService.dismissLoader(); 
          let responseData = JSON.parse(result.response);
          if (responseData.response.success == 1) {
              this.loaderService.showToast(responseData.response.message);
              this.route.navigate(['./tabs/tabs/home']);
          }
          else {
              this.loaderService.showToast(responseData.response.message);
          }
      }, (err) => {
          this.loaderService.dismissLoader();
          console.log("An error has occurred: Code = " + err.code);
          console.log("upload error source " + err.source);
          console.log("upload error target " + err.target);
          console.log("upload error http_status " + err.http_status);
          console.log("upload error body " + err.body);
          console.log("upload error exception " + err.exception);
           this.loaderService.showToast("Unable to upload image");
           this.deleteEvent(data.response.event_id);
      });
    }
    else
    {
      this.loaderService.dismissLoader(); 
      this.loaderService.showToast(data.response.message);
      this.route.navigate(['./tabs/tabs/home']);
    }
  }

  deleteEventCover(){
    this.imageSourcePath = "";
  }

  deleteEvent(event_id){
    this.loaderService.showLoader(AppConfig.LOADER_TEXT);
    let params = {
      "event_id": event_id
    };
    this.restApi.post("delete_event.php", params).subscribe((data: any) => {
        this.loaderService.dismissLoader();
        if (data.response.success == 1) {
            // this.loaderService.showToast(data.response.message);
            // this.route.navigate(['./tabs/tabs/home']);
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
