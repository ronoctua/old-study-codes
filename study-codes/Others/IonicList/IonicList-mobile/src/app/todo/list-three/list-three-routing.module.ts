import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListThreePage } from './list-three.page';

const routes: Routes = [
  {
    path: '',
    component: ListThreePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListThreePageRoutingModule {}
