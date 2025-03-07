import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendingEventDetailsPageRoutingModule } from './attending-event-details-routing.module';

import { AttendingEventDetailsPage } from './attending-event-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendingEventDetailsPageRoutingModule
  ],
  declarations: [AttendingEventDetailsPage]
})
export class AttendingEventDetailsPageModule {}
