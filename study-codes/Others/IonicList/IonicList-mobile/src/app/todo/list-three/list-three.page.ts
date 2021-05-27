import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-list-three',
  templateUrl: '../list-template.page.html',
  styleUrls: ['../list-template.page.scss'],
})
export class ListThreePage implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public global: GlobalService
  ) {
  }

  ngOnInit() {
    // get what's inside the database - shows only category 3 items
    return this.global.showList(3);
  }

  ionViewWillEnter() {
    this.global.todoCategoryRoute = "/tabs/todo/list-three";
    document.querySelector('.list-1-dot').setAttribute('style', 'display: none;');
    document.querySelector('.list-2-dot').setAttribute('style', 'display: none;');
    document.querySelector('.list-3-dot').setAttribute('style', 'display: initial;');
  }

  // change the default category on the add page
  addPage(){
    this.global.addPage("3");
  }

} // export end
