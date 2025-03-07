import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RateAttendeesPage } from './rate-attendees.page';

const routes: Routes = [
  {
    path: '',
    component: RateAttendeesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RateAttendeesPageRoutingModule {}
