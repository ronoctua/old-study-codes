import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-list-one',
  templateUrl: '../list-template.page.html',
  styleUrls: ['../list-template.page.scss'],
})
export class ListOnePage implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public global: GlobalService
  ) {
  }

  ngOnInit() {
    // get what's inside the database - shows only category 1 items
    return this.global.showList(1);
  }

  ionViewWillEnter() {
    this.global.todoCategoryRoute = "/tabs/todo/list-one";
    document.querySelector('.list-1-dot').setAttribute('style', 'display: initial;');
    document.querySelector('.list-2-dot').setAttribute('style', 'display: none;');
    document.querySelector('.list-3-dot').setAttribute('style', 'display: none;');
  }

  // change the default category on the add page
  addPage(){
    this.global.addPage("1");
  }

} // export end
