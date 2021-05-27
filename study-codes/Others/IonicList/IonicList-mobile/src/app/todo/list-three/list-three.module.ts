import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListThreePageRoutingModule } from './list-three-routing.module';
import { ListThreePage } from './list-three.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListThreePageRoutingModule
  ],
  declarations: [ListThreePage]
})
export class ListThreePageModule {}
