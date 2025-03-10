import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendingEventDetailsPage } from './attending-event-details.page';

const routes: Routes = [
  {
    path: '',
    component: AttendingEventDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendingEventDetailsPageRoutingModule {}
