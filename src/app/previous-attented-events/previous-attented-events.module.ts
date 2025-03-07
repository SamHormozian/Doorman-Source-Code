import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreviousAttentedEventsPageRoutingModule } from './previous-attented-events-routing.module';

import { PreviousAttentedEventsPage } from './previous-attented-events.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreviousAttentedEventsPageRoutingModule
  ],
  declarations: [PreviousAttentedEventsPage]
})
export class PreviousAttentedEventsPageModule {}
