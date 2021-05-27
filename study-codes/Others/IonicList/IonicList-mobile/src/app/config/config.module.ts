import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ConfigPageRoutingModule } from './config-routing.module';
import { ConfigPage } from './config.page';
import { FirebaseUIModule } from 'firebaseui-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigPageRoutingModule,
    FirebaseUIModule
  ],
  declarations: [ConfigPage]
})
export class ConfigPageModule {}
