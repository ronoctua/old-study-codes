import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListOnePageRoutingModule } from './list-one-routing.module';
import { ListOnePage } from './list-one.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListOnePageRoutingModule
  ],
  declarations: [ListOnePage]
})
export class ListOnePageModule {}
