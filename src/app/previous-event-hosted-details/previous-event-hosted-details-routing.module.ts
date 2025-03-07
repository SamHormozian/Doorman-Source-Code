import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreviousEventHostedDetailsPage } from './previous-event-hosted-details.page';

const routes: Routes = [
  {
    path: '',
    component: PreviousEventHostedDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreviousEventHostedDetailsPageRoutingModule {}
