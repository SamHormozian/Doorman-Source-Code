import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewApplicantsPage } from './review-applicants.page';

const routes: Routes = [
  {
    path: '',
    component: ReviewApplicantsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewApplicantsPageRoutingModule {}
