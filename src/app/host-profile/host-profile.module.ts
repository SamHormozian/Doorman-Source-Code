import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HostProfilePageRoutingModule } from './host-profile-routing.module';

import { HostProfilePage } from './host-profile.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    HostProfilePageRoutingModule
  ],
  declarations: [HostProfilePage]
})
export class HostProfilePageModule {}
