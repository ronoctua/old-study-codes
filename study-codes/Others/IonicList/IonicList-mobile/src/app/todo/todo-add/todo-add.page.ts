import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { Location } from "@angular/common";
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-todo-add',
  templateUrl: '../todo-add-and-edit.template.html',
  styleUrls: ['../todo-add-and-edit.template.scss'],
})
export class TodoAddPage implements OnInit {

  todoOwner = this.global.userID;
  addOrEditLabel: string;
  todoCategory = this.global.todoCategory;
  todoCategoryRoute = this.global.todoCategoryRoute;
  todoTitle: string;
  todoDetails: string|null;
  todoType: string|null;
  todoEventDate: Date|null;
  todoEventTime: Date|null;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public db: AngularFirestore,
    private toastCtrl: ToastController,
    private location: Location,
    public global: GlobalService
  ) {
  }

  // remove the ion-select arrow icons
  removeArrow() {
    const ionSelects = document.querySelectorAll('ion-select');
    ionSelects.forEach((ionSelect) => {
      const selectIcon = ionSelect.shadowRoot.querySelector('.select-icon');
      if(selectIcon) {
        selectIcon.setAttribute('style', 'display: none !important');
      }
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.removeArrow();
    }, 280);
    setTimeout(() => {
      this.removeArrow();
    }, 1000);
  }

  ionViewWillEnter() {
    this.addOrEditLabel = "ADD";
    this.todoCategory = this.global.todoCategory;
  }

  previousPage() {
    this.location.back();
  }

  addOrEdit() { // add
    let todoDate = () => {
      if (this.todoEventDate) {
        this.todoEventDate = new Date(this.todoEventDate);
        this.todoEventDate = new Date(Date.UTC(this.todoEventDate.getUTCFullYear(), this.todoEventDate.getUTCMonth(), this.todoEventDate.getUTCDate(), this.todoEventDate.getUTCHours(), this.todoEventDate.getUTCMinutes(), this.todoEventDate.getUTCSeconds()));
        return this.todoEventDate;
      }
      else {return null}
    }
    let ifExist = (that) => {
      if (that) {return that}
      else {return null}
    }
    this.db.collection(`users/${this.todoOwner}/todo`).add({
      owner: this.todoOwner,
      category: this.todoCategory,
      title: this.todoTitle,
      details: ifExist(this.todoDetails),
      type: ifExist(this.todoType),
      eventDate: todoDate(),
      eventTime: ifExist(this.todoEventTime),
      created: this.global.nowUtc
    }).then((docRef) => {
      this.toastCtrl.create({
        message: "YEAH! Added!",
        duration: 2000
      }).then((toast) => {
        if (this.todoCategory == "1") {
          this.global.listOne();
        } else if (this.todoCategory == "2") {
          this.global.listTwo();
        } else {
          this.global.listThree();
        }
        toast.present();
      })
    }).catch((err) => {
      this.toastCtrl.create({
        message: err.message,
        duration: 2000
      }).then((toast) => {
        this.router.navigate(["/tabs/todo/"]);
        toast.present();
      })
    })
    this.todoTitle = null;
    this.todoDetails = null;
    this.todoType = null;
    this.todoEventDate = null;
    this.todoEventTime = null;
  }

}
