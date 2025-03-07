import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {AppConfig} from "../app.config";
import {LoaderService} from "../services/loader.service";
import {EventService} from "../services/event.service";
import {RestApiService} from "../services/rest-api.service";
import { Router } from '@angular/router';
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-user-feedback',
  templateUrl: './user-feedback.page.html',
  styleUrls: ['./user-feedback.page.scss'],
})
export class UserFeedbackPage implements OnInit {
  feedbackForm: FormGroup;
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
  	this.feedbackForm = this.formBuilder.group({
      name: ['', [Validators.required]],
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
    return this.feedbackForm.controls;
  }

  doSubmitForm() {
    this.isSubmitted = true;
    if (!this.feedbackForm.valid) {
      this.loaderService.showToast("Please provide all the required values!");
      return false;
    } else {
      let feedbackData = {
          "user_id"      : this.userId,
          "name"      : this.feedbackForm.value.name,
          "message"      : this.feedbackForm.value.message
      }
      this.loaderService.showLoader(AppConfig.LOADER_TEXT);
      this.restApi.post("user_feedback.php", feedbackData).subscribe((data: any) => {
          this.loaderService.dismissLoader();
          if (data.response.success == 1) {
          	  this.route.navigate(['./tabs/tabs/home']);
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
