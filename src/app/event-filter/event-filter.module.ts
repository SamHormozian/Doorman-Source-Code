import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventFilterPageRoutingModule } from './event-filter-routing.module';

import { EventFilterPage } from './event-filter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventFilterPageRoutingModule
  ],
  declarations: [EventFilterPage]
})
export class EventFilterPageModule {}
