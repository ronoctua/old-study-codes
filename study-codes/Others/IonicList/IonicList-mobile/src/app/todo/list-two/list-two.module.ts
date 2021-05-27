import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListTwoPageRoutingModule } from './list-two-routing.module';
import { ListTwoPage } from './list-two.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListTwoPageRoutingModule
  ],
  declarations: [ListTwoPage]
})
export class ListTwoPageModule {}
