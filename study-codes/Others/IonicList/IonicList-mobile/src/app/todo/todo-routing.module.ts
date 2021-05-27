import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoPage } from './todo.page';

const routes: Routes = [
  {
    path: '',
    component: TodoPage,
    children: [
      {
        path: 'list-one',
        children: [
          {
            path: '',
            loadChildren: () => import('./list-one/list-one.module').then(m => m.ListOnePageModule)
          }
        ]
      },
      {
        path: 'list-two',
        children: [
          {
            path: '',
            loadChildren: () => import('./list-two/list-two.module').then(m => m.ListTwoPageModule)
          }
        ]
      },
      {
        path: 'list-three',
        children: [
          {
            path: '',
            loadChildren: () => import('./list-three/list-three.module').then(m => m.ListThreePageModule)
          }
        ]
      },
      {
        path: 'todo-add',
        children: [
          {
            path: '',
            loadChildren: () => import('./todo-add/todo-add.module').then(m => m.TodoAddPageModule)
          }
        ]
      },
      {
        path: 'todo-edit',
        children: [
          {
            path: '',
            loadChildren: () => import('./todo-edit/todo-edit.module').then(m => m.TodoEditPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/todo/list-one',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoPageRoutingModule {}
