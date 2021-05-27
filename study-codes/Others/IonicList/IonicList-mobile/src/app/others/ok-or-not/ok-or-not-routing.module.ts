import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OkOrNotPage } from './ok-or-not.page';

const routes: Routes = [
  {
    path: '',
    component: OkOrNotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OkOrNotPageRoutingModule {}
