import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventFilterPage } from './event-filter.page';

const routes: Routes = [
  {
    path: '',
    component: EventFilterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventFilterPageRoutingModule {}
