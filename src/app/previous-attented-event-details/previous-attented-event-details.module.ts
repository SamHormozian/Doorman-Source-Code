import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreviousAttentedEventDetailsPageRoutingModule } from './previous-attented-event-details-routing.module';

import { PreviousAttentedEventDetailsPage } from './previous-attented-event-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreviousAttentedEventDetailsPageRoutingModule
  ],
  declarations: [PreviousAttentedEventDetailsPage]
})
export class PreviousAttentedEventDetailsPageModule {}
