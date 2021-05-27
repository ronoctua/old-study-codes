import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TodoEditPageRoutingModule } from './todo-edit-routing.module';
import { TodoEditPage } from './todo-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodoEditPageRoutingModule
  ],
  declarations: [TodoEditPage]
})
export class TodoEditPageModule {}
