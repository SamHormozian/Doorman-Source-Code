import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopularHostPageRoutingModule } from './popular-host-routing.module';

import { PopularHostPage } from './popular-host.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopularHostPageRoutingModule
  ],
  declarations: [PopularHostPage]
})
export class PopularHostPageModule {}
