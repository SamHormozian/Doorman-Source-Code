import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttendingEventPage } from './attending-event.page';

const routes: Routes = [
  {
    path: '',
    component: AttendingEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendingEventPageRoutingModule {}
