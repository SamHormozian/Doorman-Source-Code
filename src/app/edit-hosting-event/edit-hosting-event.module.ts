import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditHostingEventPageRoutingModule } from './edit-hosting-event-routing.module';

import { EditHostingEventPage } from './edit-hosting-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditHostingEventPageRoutingModule
  ],
  declarations: [EditHostingEventPage]
})
export class EditHostingEventPageModule {}
