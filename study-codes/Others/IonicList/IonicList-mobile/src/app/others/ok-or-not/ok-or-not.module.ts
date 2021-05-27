import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OkOrNotPageRoutingModule } from './ok-or-not-routing.module';
import { OkOrNotPage } from './ok-or-not.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OkOrNotPageRoutingModule
  ],
  declarations: [OkOrNotPage]
})
export class OkOrNotPageModule {}
