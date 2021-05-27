import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-list-two',
  templateUrl: '../list-template.page.html',
  styleUrls: ['../list-template.page.scss'],
})
export class ListTwoPage implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public global: GlobalService
  ) {
  }

  ngOnInit() {
    // get what's inside the database - shows only category 2 items
    return this.global.showList(2);
  }

  ionViewWillEnter() {
    this.global.todoCategoryRoute = "/tabs/todo/list-two";
    document.querySelector('.list-1-dot').setAttribute('style', 'display: none;');
    document.querySelector('.list-2-dot').setAttribute('style', 'display: initial;');
    document.querySelector('.list-3-dot').setAttribute('style', 'display: none;');
  }

  // change the default category on the add page
  addPage(){
    this.global.addPage("2");
  }

} // export end
