import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {AppConfig} from "../app.config";
import {LoaderService} from "../services/loader.service";
import {EventService} from "../services/event.service";
import {RestApiService} from "../services/rest-api.service";
import { Router } from '@angular/router';
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage{
  signUpForm: FormGroup;
  isSubmitted = false;
  constructor(
  	public formBuilder: FormBuilder,
  	private loaderService: LoaderService,
  	private eventServices: EventService,
  	private restApi: RestApiService,
    private storage: StorageService,
  	private route: Router
  	) { }

  ngOnInit() {
  	this.signUpForm = this.formBuilder.group({
      // phone: ['', [Validators.required, Validators.pattern(AppConfig.MOBILE_REGEX)]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.pattern(AppConfig.EMAIL_REGEX)]],
      termsCheck: [false, [Validators.requiredTrue]]
    })
  }

  get errorControl() {
    return this.signUpForm.controls;
  }

  doSubmitForm() {
    this.isSubmitted = true;
    if (!this.signUpForm.valid) {
      this.loaderService.showToast("Please provide all the required values!");
      return false;
    } else {
      let registerFormData = {
          "phone"      : this.signUpForm.value.phone,
          "email"      : this.signUpForm.value.email
      }
      this.loaderService.showLoader(AppConfig.LOADER_TEXT);
      this.restApi.post("do_check_user.php", registerFormData).subscribe((data: any) => {
          this.loaderService.dismissLoader();
          if (data.response.success == 1) {
              this.storage.set("SIGNUP_DATA", {
                phone: this.signUpForm.value.phone,
                email: this.signUpForm.value.email
              });
              this.route.navigate(['./otp']);
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
