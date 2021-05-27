import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListOnePage } from './list-one.page';

const routes: Routes = [
  {
    path: '',
    component: ListOnePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListOnePageRoutingModule {}
