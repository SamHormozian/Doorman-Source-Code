import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendQrPage } from './send-qr.page';

const routes: Routes = [
  {
    path: '',
    component: SendQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendQrPageRoutingModule {}
