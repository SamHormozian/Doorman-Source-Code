import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventCategoriesPage } from './event-categories.page';

const routes: Routes = [
  {
    path: '',
    component: EventCategoriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventCategoriesPageRoutingModule {}
