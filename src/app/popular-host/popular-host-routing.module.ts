import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopularHostPage } from './popular-host.page';

const routes: Routes = [
  {
    path: '',
    component: PopularHostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopularHostPageRoutingModule {}
