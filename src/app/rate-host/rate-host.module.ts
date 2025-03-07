import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RateHostPageRoutingModule } from './rate-host-routing.module';

import { RateHostPage } from './rate-host.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RateHostPageRoutingModule
  ],
  declarations: [RateHostPage]
})
export class RateHostPageModule {}
