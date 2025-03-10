import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SigninPageRoutingModule } from './signin-routing.module';
import { SigninPage } from './signin.page';
import {IonicInputMaskModule} from "@thiagoprz/ionic-input-mask";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicInputMaskModule,
    IonicModule,
    SigninPageRoutingModule
  ],
  declarations: [SigninPage]
})
export class SigninPageModule {}
