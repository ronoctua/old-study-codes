import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoEditPage } from './todo-edit.page';

const routes: Routes = [
  {
    path: '',
    component: TodoEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoEditPageRoutingModule {}
