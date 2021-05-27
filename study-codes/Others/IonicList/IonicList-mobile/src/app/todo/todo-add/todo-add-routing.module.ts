import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoAddPage } from './todo-add.page';

const routes: Routes = [
  {
    path: '',
    component: TodoAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoAddPageRoutingModule {}
