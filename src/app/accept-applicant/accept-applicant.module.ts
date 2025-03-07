import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcceptApplicantPageRoutingModule } from './accept-applicant-routing.module';

import { AcceptApplicantPage } from './accept-applicant.page';

import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    AcceptApplicantPageRoutingModule
  ],
  declarations: [AcceptApplicantPage]
})
export class AcceptApplicantPageModule {}
