import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserFeedbackPageRoutingModule } from './user-feedback-routing.module';

import { UserFeedbackPage } from './user-feedback.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UserFeedbackPageRoutingModule
  ],
  declarations: [UserFeedbackPage]
})
export class UserFeedbackPageModule {}
