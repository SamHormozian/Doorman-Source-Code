import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HostEventPageRoutingModule } from './host-event-routing.module';
import { HostEventPage } from './host-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HostEventPageRoutingModule
  ],
  declarations: [HostEventPage]
})
export class HostEventPageModule {}
