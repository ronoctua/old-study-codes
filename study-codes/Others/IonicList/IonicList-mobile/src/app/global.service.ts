import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GlobalService implements OnInit{

  public hasVerifiedEmail = false;
  public userName: string;
  public userEmail: string;
  public userID: string;
  public todoList: any[] = [];
  public todoCategory: any;
  public todoCategoryRoute: string;
  public now = new Date();
  public nowUtc = new Date(Date.UTC(this.now.getUTCFullYear(), this.now.getUTCMonth(), this.now.getUTCDate(), this.now.getUTCHours(), this.now.getUTCMinutes(), this.now.getUTCSeconds()));
  public itemToEdit;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private db: AngularFirestore
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.hasVerifiedEmail = this.afAuth.auth.currentUser.emailVerified;
        this.userName = this.afAuth.auth.currentUser.displayName;
        this.userEmail = this.afAuth.auth.currentUser.email;
        this.userID = this.afAuth.auth.currentUser.uid;
        if (!this.hasVerifiedEmail) {this.router.navigate(["/home"]);}
      }
      else {
        this.router.navigate(["/home"]);
      }
    });
  }

  ngOnInit() {
  }

  checkAppTheme() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userID = this.afAuth.auth.currentUser.uid;
        this.db.doc(`users/${this.userID}/themes/appTheme`).ref.get().then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            const prefersTheme = window.matchMedia(`(prefers-color-scheme: ${documentSnapshot.get('appThemeName')})`);
            document.body.classList.toggle(`${documentSnapshot.get('appThemeName')}`, prefersTheme.matches);
            prefersTheme.addListener((mediaQuery) => document.body.classList.toggle(`${documentSnapshot.get('appThemeName')}`, mediaQuery.matches));
          } else {
            this.db.collection(`users/${this.userID}/themes`).doc("appTheme").set({appThemeName: 'light'});
          }
        })
      }
    });
  }

  // get what's inside the database
  showList(cat) {
    this.db.collection(`users/${this.userID}/todo`)
    .snapshotChanges().subscribe((querySnapshot) => {
      this.todoList = [];
      querySnapshot.forEach(item => {
        let todoItem = item.payload.doc.data();
        let category = todoItem['category'];
        if (category == cat){
          todoItem['id'] = item.payload.doc.id;
          this.todoList.push(todoItem);
        }
      });
      this.todoList = this.todoList.sort(         // sorts items by date
        (a, b) => (b.event_date != null ? b.event_date.toDate() : 0) - (a.event_date != null ? a.event_date.toDate() : 0)
      );
    });
  }

  // go to list 1
  listOne() {
    this.router.navigate(["/tabs/todo/list-one"]);
    setTimeout(() => {
      document.querySelector('.list-1-dot').setAttribute('style', 'display: initial;');
      document.querySelector('.list-2-dot').setAttribute('style', 'display: none;');
      document.querySelector('.list-3-dot').setAttribute('style', 'display: none;');
      this.showList(1);
    }, 150);
  }

  // go to list 2
  listTwo() {
    this.router.navigate(["/tabs/todo/list-two"]);
    setTimeout(() => {
      document.querySelector('.list-1-dot').setAttribute('style', 'display: none;');
      document.querySelector('.list-2-dot').setAttribute('style', 'display: initial;');
      document.querySelector('.list-3-dot').setAttribute('style', 'display: none;');
      this.showList(2);
    }, 150);
  }

  // go to list 3
  listThree() {
    this.router.navigate(["/tabs/todo/list-three"]);
    setTimeout(() => {
      document.querySelector('.list-1-dot').setAttribute('style', 'display: none;');
      document.querySelector('.list-2-dot').setAttribute('style', 'display: none;');
      document.querySelector('.list-3-dot').setAttribute('style', 'display: initial;');
      this.showList(3);
    }, 150);
  }

  // changes the date display format
  getDate(theDate) {
    let okDate = theDate.toDate();
    return okDate.toLocaleDateString();
  }

  // changes the time display format
  getTime(theTime) {
    function addZero(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }
    let date = new Date(theTime);
    let hh = addZero(date.getHours());
    let mm = addZero(date.getMinutes());
    let okTime = hh + ":" + mm;
    return okTime;
  }

  // change the default category on the add page
  addPage(cat) {
    this.todoCategory = cat;
    this.router.navigate(["/tabs/todo/todo-add"]);
  }

  // edit items from the database
  editPage(item) {
    this.itemToEdit = item;
    this.router.navigate(["/tabs/todo/todo-edit"]);
  }

  // remove items from the database
  deleteItem(item) {
    this.db.doc(`users/${this.userID}/todo/${item.id}`).delete();
    this.router.navigate([this.todoCategoryRoute]);
  }

} // export end
