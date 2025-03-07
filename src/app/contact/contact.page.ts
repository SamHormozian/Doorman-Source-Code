import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {AppConfig} from "../app.config";
import {LoaderService} from "../services/loader.service";
import {EventService} from "../services/event.service";
import {RestApiService} from "../services/rest-api.service";
import { Router } from '@angular/router';
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage{
  contactForm: FormGroup;
  isSubmitted = false;
  userId: any = "";
  constructor(
  		public formBuilder: FormBuilder,
	  	private loaderService: LoaderService,
	  	private eventServices: EventService,
	  	private restApi: RestApiService,
	    private storage: StorageService,
	  	private route: Router
  	) { }

  ngOnInit() {
  	this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(AppConfig.EMAIL_REGEX)]],
      message: ['', [Validators.required]]
    })
  }

  ionViewDidEnter(){
     this.storage.get("USER_ID").then((res) => {
        if(res){
          this.userId = res;
        }
    });
  }

  get errorControl() {
    return this.contactForm.controls;
  }

  doSubmitForm() {
    this.isSubmitted = true;
    if (!this.contactForm.valid) {
      this.loaderService.showToast("Please provide all the required values!");
      return false;
    } else {
      let contactData = {
          "user_id"      : this.userId,
          "name"      : this.contactForm.value.name,
          "phone"      : this.contactForm.value.phone,
          "email"      : this.contactForm.value.email,
          "message"      : this.contactForm.value.message
      }
      this.loaderService.showLoader(AppConfig.LOADER_TEXT);
      this.restApi.post("contact.php", contactData).subscribe((data: any) => {
          this.loaderService.dismissLoader();
          if (data.response.success == 1) {
          	  this.route.navigate(['./tabs/tabs/settings']);
              this.loaderService.showToast(data.response.message);
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
