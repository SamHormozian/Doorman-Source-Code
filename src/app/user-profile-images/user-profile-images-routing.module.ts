import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfileImagesPage } from './user-profile-images.page';

const routes: Routes = [
  {
    path: '',
    component: UserProfileImagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileImagesPageRoutingModule {}
