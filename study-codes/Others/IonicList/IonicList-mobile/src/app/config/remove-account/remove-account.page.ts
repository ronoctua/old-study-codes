import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, NavigationExtras } from '@angular/router';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-remove-account',
  templateUrl: './remove-account.page.html',
  styleUrls: ['./remove-account.page.scss'],
})
export class RemoveAccountPage implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public global: GlobalService
  ) {
    setInterval(() => {
      let buttons = document.querySelectorAll('.btn');
      buttons.forEach(element => {
        element.classList.toggle('hide');
      });
    }, 1500);
  } // contructor end

  ngOnInit() {
  }

  remove() {
    this.afAuth.auth.currentUser.delete().then(() => {
      alert("YOUR ACCOUNT HAS BEEN REMOVED!");
    }).catch((error) => {
      console.log(error);
      alert("You have been connected for a long time. So for security please re-login and try to delete the account again.");
      this.afAuth.auth.signOut();
    });
  }

  navigationExtras: NavigationExtras = {
    state: {
      theOk: true,
      theLogout: false,
      theRoute: "/tabs/config",
      theMessage: "YEAH! We do not remove your account"
    }
  }
  notRemove() {
    this.router.navigate(["/ok-or-not"], this.navigationExtras);
  }

}
