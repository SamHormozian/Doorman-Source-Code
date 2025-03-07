import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageApplicantPage } from './manage-applicant.page';

const routes: Routes = [
  {
    path: '',
    component: ManageApplicantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageApplicantPageRoutingModule {}
