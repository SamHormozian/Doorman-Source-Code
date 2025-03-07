import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewApplicantsPageRoutingModule } from './review-applicants-routing.module';

import { ReviewApplicantsPage } from './review-applicants.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewApplicantsPageRoutingModule
  ],
  declarations: [ReviewApplicantsPage]
})
export class ReviewApplicantsPageModule {}
