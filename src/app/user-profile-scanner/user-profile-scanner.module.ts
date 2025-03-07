import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserProfileScannerPageRoutingModule } from './user-profile-scanner-routing.module';

import { UserProfileScannerPage } from './user-profile-scanner.page';
import { SwiperModule } from 'swiper/angular';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    UserProfileScannerPageRoutingModule
  ],
  declarations: [UserProfileScannerPage]
})
export class UserProfileScannerPageModule {}
