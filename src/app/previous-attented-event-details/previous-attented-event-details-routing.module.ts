import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreviousAttentedEventDetailsPage } from './previous-attented-event-details.page';

const routes: Routes = [
  {
    path: '',
    component: PreviousAttentedEventDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreviousAttentedEventDetailsPageRoutingModule {}
