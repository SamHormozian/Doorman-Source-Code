import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendingEventPageRoutingModule } from './attending-event-routing.module';

import { AttendingEventPage } from './attending-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendingEventPageRoutingModule
  ],
  declarations: [AttendingEventPage]
})
export class AttendingEventPageModule {}
