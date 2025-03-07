import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HostingUpcomingEventsPageRoutingModule } from './hosting-upcoming-events-routing.module';

import { HostingUpcomingEventsPage } from './hosting-upcoming-events.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HostingUpcomingEventsPageRoutingModule
  ],
  declarations: [HostingUpcomingEventsPage]
})
export class HostingUpcomingEventsPageModule {}
