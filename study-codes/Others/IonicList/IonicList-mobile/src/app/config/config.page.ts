import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, NavigationExtras } from '@angular/router';
import { GlobalService } from '../global.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  public themeToggle: boolean;
  public dbTheme;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public global: GlobalService,
    private db: AngularFirestore
  ) {
    this.dbTheme = this.db.collection(`users/${this.global.userID}/themes`).doc("appTheme");

    this.db.doc(`users/${this.global.userID}/themes/appTheme`).ref.get().then((documentSnapshot) => {
      if (documentSnapshot.get('appThemeName') === 'dark') {
        this.themeToggle = true;
      } else {
        this.themeToggle = false;
      }
    })
  }

  bye() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(["/home"]);
    });
  }

  navigationExtras: NavigationExtras = {
    state: {
      theOk: true,
      theLogout: false,
      theRoute: "/tabs/config",
      theMessage: ""
    }
  }

  changePassword() {
    this.afAuth.auth.sendPasswordResetEmail(this.global.userEmail).then(() => {
      this.navigationExtras.state.theOk = true;
      this.navigationExtras.state.theLogout = true;
      this.navigationExtras.state.theMessage = "Email sent to you to change password";
      this.router.navigate(["/ok-or-not"], this.navigationExtras);
    }).catch((error) => {
      console.log(error);
      this.navigationExtras.state.theOk = false;
      this.navigationExtras.state.theLogout = false;
      this.navigationExtras.state.theMessage = "Something went wrong!";
      this.router.navigate(["/ok-or-not"], this.navigationExtras);
    });
  }

  ngOnInit() {
  }

  themeSwitcher() {
    if (this.themeToggle === true) {
      this.dbTheme.update({appThemeName: 'dark'});
      document.body.classList.add('dark');
    }
    else {
      this.dbTheme.update({appThemeName: 'light'});
      this.global.checkAppTheme();
      document.body.classList.remove('dark');
    }
  }

} // export end
