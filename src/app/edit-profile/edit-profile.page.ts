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
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage {
  dateType: any = "text";
  isPageType:any = "0";
  editProfileForm: FormGroup;
  isSubmitted = false;
  imageSourcePath: any = "";
  userId:any = "";
  userData:any = [];
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
    this.editProfileForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      school: ['', [Validators.required]],
      bio: ['', [Validators.required]]
    })
  }

  ionViewDidEnter(){
    this.isPageType = this.activatedRoute.snapshot.paramMap.get('page_type'); 

    this.storage.get("USER_ID").then((res) => {
        if(res){
          this.userId = res;
        }
    });

    this.storage.get("USER_DATA").then((res) => {
        if(res){
          this.userData = res;
          let profileData = res;
          this.editProfileForm.controls['name'].setValue(profileData.name);
          this.editProfileForm.controls['dob'].setValue(profileData.dob);
          this.editProfileForm.controls['gender'].setValue(profileData.gender);
          this.editProfileForm.controls['school'].setValue(profileData.school_name);
          this.editProfileForm.controls['bio'].setValue(profileData.bio);
        }
    });
    
  }

  get errorControl() {
    return this.editProfileForm.controls;
  }

  doSubmitForm() {
    this.isSubmitted = true;
    if (!this.editProfileForm.valid) {
      this.loaderService.showToast("Please provide all the required values!");
      return false;
    } else {
      let editProfileFormData = {
          "user_id"    : this.userId,
          "name"       : this.editProfileForm.value.name,
          "dob"        : this.editProfileForm.value.dob,
          "gender"     : this.editProfileForm.value.gender,
          "school"     : this.editProfileForm.value.school,
          "bio"        : this.editProfileForm.value.bio
      }
      this.loaderService.showLoader(AppConfig.LOADER_TEXT);
      this.restApi.post("user_profile_update.php", editProfileFormData).subscribe((data: any) => {
          // this.loaderService.dismissLoader();
          if (data.response.success == 1) {
              this.uploadHostImage(data);
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

  changeDateType(){
    this.dateType = "date";
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

  uploadHostImage(data){
    if(this.imageSourcePath !=""){
       const fileTransfer: FileTransferObject = this.transfer.create();
        let options: FileUploadOptions         = {
            fileKey    : 'file',
            fileName   : 'host_profile_image',
            chunkedMode: false,
            mimeType   : "image/jpeg",
            params     : {
                "host_id"     : data.response.userData.id,
                "securitykey": AppConfig.SECURITY_TOKEN
            },
            headers    : {}
        };
        console.log(options);
        fileTransfer.upload(this.imageSourcePath, AppConfig.API_URL + '/upload_host_image.php', options)
        .then((result: any) => {
            console.log("ImageResponseData", result);
            this.loaderService.dismissLoader(); 
            let responseData = JSON.parse(result.response);
            console.log("responseData...", responseData);
            console.log("response_success...", responseData.response.success);
            if (responseData.response.success == 1) {
                console.log("get ready...");
                this.loaderService.showToast(responseData.response.message);
                this.storage.set("USER_DATA", responseData.response.userData);
                this.storage.set("USER_ID", responseData.response.userData.id);
                this.storage.remove("SIGNUP_DATA");
                this.navController.navigateBack(['tabs/tabs/settings/user-profile/'+this.isPageType]);
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
      else{
        this.storage.set("USER_DATA", data.response.userData);
        this.storage.set("USER_ID", data.response.userData.id);
        this.loaderService.dismissLoader();
        this.loaderService.showToast(data.response.message);
        this.navController.navigateBack(['tabs/tabs/settings/user-profile/'+this.isPageType]);
      }
  }

  backToPrevious(){
    this.navController.navigateBack(['tabs/tabs/settings/user-profile/'+this.isPageType]);
  }

  goToUserImage(userId){
    this.navController.navigateBack(['user-profile-images/'+userId+'/'+this.isPageType]);
  }
}
