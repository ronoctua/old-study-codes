import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RemoveAccountPage } from './remove-account.page';

const routes: Routes = [
  {
    path: '',
    component: RemoveAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemoveAccountPageRoutingModule {}
