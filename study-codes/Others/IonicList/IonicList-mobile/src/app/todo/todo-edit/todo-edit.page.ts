import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { Location } from "@angular/common";
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: '../todo-add-and-edit.template.html',
  styleUrls: ['../todo-add-and-edit.template.scss'],
})
export class TodoEditPage implements OnInit {

  todoOwner = this.global.userID;
  addOrEditLabel: string;
  todoCategory: any;
  todoTitle: string;
  todoDetails: string|null;
  todoType: string|null;
  todoEventDate: Date|null;
  todoEventTime: Date|null;
  itemToEdit = this.global.itemToEdit;

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
    this.addOrEditLabel = "EDIT";
    this.itemToEdit = this.global.itemToEdit;
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.db.doc(`users/${this.todoOwner}/todo/${this.itemToEdit.id}`).ref.get().then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            this.todoCategory = documentSnapshot.get('category');
            this.todoTitle = documentSnapshot.get('title');
            documentSnapshot.get('details') ? this.todoDetails = documentSnapshot.get('details') : this.todoDetails = null;
            documentSnapshot.get('type') ? this.todoType = documentSnapshot.get('type') : this.todoType = null;
            documentSnapshot.get('eventDate') ? this.todoEventDate = documentSnapshot.get('eventDate').toDate().toISOString() : this.todoEventDate = null;
            documentSnapshot.get('eventTime') ? this.todoEventTime = documentSnapshot.get('eventTime') : this.todoEventTime = null;
          } else {
            console.log('Error! The item to edit could not be found.');
            this.router.navigate(["/tabs/todo"]);
          }
        })
      }
    });
  }

  previousPage() {
    this.location.back();
  }

  addOrEdit() { // edit
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
    this.db.collection(`users/${this.todoOwner}/todo`).doc(this.itemToEdit.id).update({
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
        message: "YEAH! Edited!",
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
