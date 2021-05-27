import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RemoveAccountPageRoutingModule } from './remove-account-routing.module';
import { RemoveAccountPage } from './remove-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemoveAccountPageRoutingModule
  ],
  declarations: [RemoveAccountPage]
})
export class RemoveAccountPageModule {}
