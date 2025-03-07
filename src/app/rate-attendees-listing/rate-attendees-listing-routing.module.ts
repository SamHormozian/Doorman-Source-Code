import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RateAttendeesListingPage } from './rate-attendees-listing.page';

const routes: Routes = [
  {
    path: '',
    component: RateAttendeesListingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RateAttendeesListingPageRoutingModule {}
