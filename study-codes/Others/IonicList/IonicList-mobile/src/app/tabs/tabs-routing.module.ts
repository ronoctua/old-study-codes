import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'policy',
        children: [
          {
            path: '',
            loadChildren: () => import('../others/policy/policy.module').then( m => m.PolicyPageModule)
          }
        ]
      },
      {
        path: 'config',
        children: [
          {
            path: '',
            loadChildren: () => import('../config/config.module').then( m => m.ConfigPageModule)
          }
        ]
      },
      {
        path: 'change-name',
        children: [
          {
            path: '',
            loadChildren: () => import('../config/change-name/change-name.module').then( m => m.ChangeNamePageModule)
          }
        ]
      },
      {
        path: 'remove-account',
        children: [
          {
            path: '',
            loadChildren: () => import('../config/remove-account/remove-account.module').then( m => m.RemoveAccountPageModule)
          }
        ]
      },
      {
        path: 'todo',
        children: [
          {
            path: '',
            loadChildren: () => import('../todo/todo.module').then( m => m.TodoPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/todo/list-one',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
