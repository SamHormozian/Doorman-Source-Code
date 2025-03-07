import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreviousEventHostedDetailsPageRoutingModule } from './previous-event-hosted-details-routing.module';

import { PreviousEventHostedDetailsPage } from './previous-event-hosted-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreviousEventHostedDetailsPageRoutingModule
  ],
  declarations: [PreviousEventHostedDetailsPage]
})
export class PreviousEventHostedDetailsPageModule {}
