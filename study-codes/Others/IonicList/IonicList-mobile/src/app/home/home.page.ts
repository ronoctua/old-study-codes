import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from "@ionic/angular";
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  emailSendingDate;

  constructor(
    public afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public global: GlobalService
  ) { }

  checkAccount() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        if (this.global.hasVerifiedEmail) {
          setTimeout(() => { this.navCtrl.navigateRoot(["/tabs"]) }, 3500);
        }
        else {
          this.sendVerificationEmail();
          let checkEmail = setInterval(() => {
            console.log("Checking email..");
            user.reload().then(
              () => {
                if (user.emailVerified) {
                  clearInterval(checkEmail);
                  this.navCtrl.navigateRoot(["/tabs"]);
                }
              }
            );
          }, 11000); // let checkEmail and setInterval end
        } // else end

      } // if(1) end
    }); // this.afAuth.. end
  }

  ionViewWillEnter() {
    this.checkAccount();
  }

  sendVerificationEmail() {
    this.afAuth.auth.currentUser.sendEmailVerification();
    this.emailSendingDate = new Date();
    this.emailSendingDate = this.emailSendingDate.toLocaleDateString();
  }

  bye() {
    this.afAuth.auth.signOut().then(() => {
      this.navCtrl.navigateRoot(["/home"]);
    });
  }

} // export end
