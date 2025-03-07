import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageApplicantPageRoutingModule } from './manage-applicant-routing.module';

import { ManageApplicantPage } from './manage-applicant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageApplicantPageRoutingModule
  ],
  declarations: [ManageApplicantPage]
})
export class ManageApplicantPageModule {}
