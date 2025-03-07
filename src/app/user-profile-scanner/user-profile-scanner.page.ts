import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);

@Component({
  selector: 'app-user-profile-scanner',
  templateUrl: './user-profile-scanner.page.html',
  styleUrls: ['./user-profile-scanner.page.scss'],
})
export class UserProfileScannerPage{

 sliderConfig = {
	  initialSlide: 0,
	  slidesPerView: 1,
	  pagination: true,
	  spaceBetween: 0
  	}
  constructor(private navController: NavController) { }

  ngOnInit() {
  }
   backToPrevious(){
    this.navController.back();
  }
}
