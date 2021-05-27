import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangeNamePage } from './change-name.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeNamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeNamePageRoutingModule {}
