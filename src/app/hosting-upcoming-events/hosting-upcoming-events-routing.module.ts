import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HostingUpcomingEventsPage } from './hosting-upcoming-events.page';

const routes: Routes = [
  {
    path: '',
    component: HostingUpcomingEventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HostingUpcomingEventsPageRoutingModule {}
