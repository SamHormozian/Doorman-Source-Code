import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreviousEventHostedPage } from './previous-event-hosted.page';

const routes: Routes = [
  {
    path: '',
    component: PreviousEventHostedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreviousEventHostedPageRoutingModule {}
