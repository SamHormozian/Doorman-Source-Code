import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventCategoriesPageRoutingModule } from './event-categories-routing.module';

import { EventCategoriesPage } from './event-categories.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventCategoriesPageRoutingModule
  ],
  declarations: [EventCategoriesPage]
})
export class EventCategoriesPageModule {}
