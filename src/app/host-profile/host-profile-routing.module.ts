import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HostProfilePage } from './host-profile.page';

const routes: Routes = [
  {
    path: '',
    component: HostProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HostProfilePageRoutingModule {}
