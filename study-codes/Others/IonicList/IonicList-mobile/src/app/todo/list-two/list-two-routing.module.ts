import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListTwoPage } from './list-two.page';

const routes: Routes = [
  {
    path: '',
    component: ListTwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListTwoPageRoutingModule {}
