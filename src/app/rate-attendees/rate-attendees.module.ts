import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RateAttendeesPageRoutingModule } from './rate-attendees-routing.module';

import { RateAttendeesPage } from './rate-attendees.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RateAttendeesPageRoutingModule
  ],
  declarations: [RateAttendeesPage]
})
export class RateAttendeesPageModule {}
