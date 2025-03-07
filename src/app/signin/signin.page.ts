import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {AppConfig} from "../app.config";
import {LoaderService} from "../services/loader.service";
import {EventService} from "../services/event.service";
import {RestApiService} from "../services/rest-api.service";
import { Router } from '@angular/router';
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage{
  signInForm: FormGroup;
  isSubmitted = false;
  pushToken: any = "";
  constructor(
      public formBuilder: FormBuilder,
      private loaderService: LoaderService,
      private eventServices: EventService,
      private restApi: RestApiService,
      private storage: StorageService,
      private route: Router
  	) { }

  ngOnInit() {
  	this.signInForm = this.formBuilder.group({
      // phone: ['', [Validators.required, Validators.pattern(AppConfig.MOBILE_REGEX)]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.pattern(AppConfig.EMAIL_REGEX)]]
    })
  }

  ionViewDidEnter(){
    // this.loaderService.showLoader(AppConfig.LOADER_TEXT);
     this.storage.get("PUSH_TOKEN").then((token) => {
        console.log("token", token);
        if(token){
          this.pushToken = token;
        }
    });
  }

  get errorControl() {
    return this.signInForm.controls;
  }

  doSubmitForm() {
    this.isSubmitted = true;
    if (!this.signInForm.valid) {
      this.loaderService.showToast("Please provide all the required values!");
      return false;
    } else {
      let loginFormData = {
            "phone" : this.signInForm.value.phone,
            "token"      : this.pushToken
      }
      this.loaderService.showLoader(AppConfig.LOADER_TEXT);
      this.restApi.post("login.php", loginFormData).subscribe((data: any) => {
          this.loaderService.dismissLoader();
          if (data.response.success == 1) {
              this.loaderService.showToast(data.response.message);
              this.storage.set("USER_DATA", data.response.userData);
              this.storage.set("USER_ID", data.response.userData.id);
              this.route.navigate(['./tabs/tabs/home']);
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
