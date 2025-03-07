import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreviousEventHostedPageRoutingModule } from './previous-event-hosted-routing.module';

import { PreviousEventHostedPage } from './previous-event-hosted.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreviousEventHostedPageRoutingModule
  ],
  declarations: [PreviousEventHostedPage]
})
export class PreviousEventHostedPageModule {}
