import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendQrPageRoutingModule } from './send-qr-routing.module';

import { SendQrPage } from './send-qr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendQrPageRoutingModule
  ],
  declarations: [SendQrPage]
})
export class SendQrPageModule {}
