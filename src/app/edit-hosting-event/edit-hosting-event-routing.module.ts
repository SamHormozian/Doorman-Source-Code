import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditHostingEventPage } from './edit-hosting-event.page';

const routes: Routes = [
  {
    path: '',
    component: EditHostingEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditHostingEventPageRoutingModule {}
