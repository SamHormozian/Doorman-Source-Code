import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {AppConfig} from "../app.config";
import {LoaderService} from "../services/loader.service";
import {EventService} from "../services/event.service";
import {RestApiService} from "../services/rest-api.service";
import {StorageService} from "../services/storage.service";
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import {FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import { NavController} from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile-images',
  templateUrl: './user-profile-images.page.html',
  styleUrls: ['./user-profile-images.page.scss'],
})
export class UserProfileImagesPage implements OnInit {
  isPageType:any = "0";
  imageSourcePath: any = "";
  userId:any = "";
  userImages: any = [];
  constructor(
  		private navController: NavController, 
	    public activatedRoute: ActivatedRoute,
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
  }

  ionViewDidEnter(){
	    this.isPageType = this.activatedRoute.snapshot.paramMap.get('page_type'); 
	    this.userId = this.activatedRoute.snapshot.paramMap.get('user_id'); 
	    this.getAllImages();
	}

  backToPrevious(){
    this.navController.navigateBack(['edit-profile/'+this.isPageType]);
  }

  getAllImages(){
  	this.loaderService.showLoader(AppConfig.LOADER_TEXT);
    let params = {
      "user_id": this.userId
    };
    this.restApi.post("get_all_user_images.php", params).subscribe((data: any) => {
        this.loaderService.dismissLoader();
        if (data.response.success == 1) {
            this.userImages = data.response.user_image_list;
        }
        else {
            this.loaderService.showToast(data.response.message);
        }
    }, err => {
        this.loaderService.dismissLoader();
        this.loaderService.showToast(AppConfig.API_ERROR);
    });
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
      this.uploadHostImage();
    }, (err) => {
      // Handle error
    });
  }

  uploadHostImage(){
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions         = {
        fileKey    : 'file',
        fileName   : 'host_profile_image',
        chunkedMode: false,
        mimeType   : "image/jpeg",
        params     : {
            "user_id"     : this.userId,
            "securitykey": AppConfig.SECURITY_TOKEN
        },
        headers    : {}
    };
    console.log(options);
    fileTransfer.upload(this.imageSourcePath, AppConfig.API_URL + '/upload_user_image.php', options)
    .then((result: any) => {
        console.log("ImageResponseData", result);
        this.loaderService.dismissLoader(); 
        let responseData = JSON.parse(result.response);
        console.log("responseData...", responseData);
        console.log("response_success...", responseData.response.success);
        if (responseData.response.success == 1) {
            console.log("get ready...");
            this.loaderService.showToast(responseData.response.message);
            this.getAllImages();
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
    });
  }

  doSubmitImages(){
  	this.loaderService.showLoader(AppConfig.LOADER_TEXT);
    let params = {
      "user_id": this.userId
    };
    this.restApi.post("update_user_images.php", params).subscribe((data: any) => {
        this.loaderService.dismissLoader();
        if (data.response.success == 1) {
            this.storage.set("USER_DATA", data.response.userData);
            this.storage.set("USER_ID", data.response.userData.id);
            this.navController.navigateBack(['edit-profile/'+this.isPageType]);
        }
        else {
            this.loaderService.showToast(data.response.message);
        }
    }, err => {
        this.loaderService.dismissLoader();
        this.loaderService.showToast(AppConfig.API_ERROR);
    });
  }

  deleteUserImage(image_id){
  	this.loaderService.showLoader(AppConfig.LOADER_TEXT);
    let params = {
      "user_id": this.userId,
      "image_id": image_id
    };
    this.restApi.post("delete_user_image.php", params).subscribe((data: any) => {
        this.loaderService.dismissLoader();
        if (data.response.success == 1) {
            this.loaderService.showToast(data.response.message);
            this.getAllImages();
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
