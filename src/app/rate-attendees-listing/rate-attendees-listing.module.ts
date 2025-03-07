import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RateAttendeesListingPageRoutingModule } from './rate-attendees-listing-routing.module';

import { RateAttendeesListingPage } from './rate-attendees-listing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RateAttendeesListingPageRoutingModule
  ],
  declarations: [RateAttendeesListingPage]
})
export class RateAttendeesListingPageModule {}
