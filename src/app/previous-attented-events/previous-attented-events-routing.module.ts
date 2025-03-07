import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreviousAttentedEventsPage } from './previous-attented-events.page';

const routes: Routes = [
  {
    path: '',
    component: PreviousAttentedEventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreviousAttentedEventsPageRoutingModule {}
