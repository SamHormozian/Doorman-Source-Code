import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RateHostPage } from './rate-host.page';

const routes: Routes = [
  {
    path: '',
    component: RateHostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RateHostPageRoutingModule {}
