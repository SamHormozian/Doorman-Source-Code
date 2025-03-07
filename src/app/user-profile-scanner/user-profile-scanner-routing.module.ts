import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfileScannerPage } from './user-profile-scanner.page';

const routes: Routes = [
  {
    path: '',
    component: UserProfileScannerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileScannerPageRoutingModule {}
