import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {AppConfig} from "../app.config";
import {LoaderService} from "../services/loader.service";
import {EventService} from "../services/event.service";
import {RestApiService} from "../services/rest-api.service";
import { Router } from '@angular/router';
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage{
  otpForm: FormGroup;
  isSubmitted = false;
  signUpData:any = [];
  constructor(
  		public formBuilder: FormBuilder,
		private loaderService: LoaderService,
	  	private eventServices: EventService,
	  	private restApi: RestApiService,
	  	private storage: StorageService,
	  	private route: Router
  	) { }

	ngOnInit() {
		this.otpForm = this.formBuilder.group({
		  otp1: ['', [Validators.required]],
		  otp2: ['', [Validators.required]],
		  otp3: ['', [Validators.required]],
		  otp4: ['', [Validators.required]],
		  otp5: ['', [Validators.required]],
		  otp6: ['', [Validators.required]]
		})
	}

	get errorControl() {
		return this.otpForm.controls;
	}

	doSubmitForm() {
		this.isSubmitted = true;
		if (!this.otpForm.valid) {
		  this.loaderService.showToast("Please fill out all boxes!");
		  return false;
		} else {
			this.route.navigate(['./create-profile']);
		}
	}

  	otpController(event,next,prev, index){
	    if(index == 6) {
	      console.log("submit")
	    }

	    if(event.target.value.length < 1 && prev){
	      prev.setFocus()
	    }
	    else if(next && event.target.value.length>0){
	      next.setFocus();
	    }
	    else {
	     return 0;
	    } 
 	}

 	ionViewDidEnter(){
	    this.storage.get("SIGNUP_DATA").then((res) => {
	        if(res){
	        	console.log(res);
	        	this.signUpData = res;
	        }
	    });
	}

}
