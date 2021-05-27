import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-ok-or-not',
  templateUrl: './ok-or-not.page.html',
  styleUrls: ['./ok-or-not.page.scss'],
})
export class OkOrNotPage implements OnInit {

  theOk: boolean;
  theLogout: boolean;
  theRoute: string|boolean;
  theMessage: any;
  theThumbs: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public afAuth: AngularFireAuth
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.theOk = this.router.getCurrentNavigation().extras.state.theOk;
        this.theLogout = this.router.getCurrentNavigation().extras.state.theLogout;
        this.theRoute = this.router.getCurrentNavigation().extras.state.theRoute;
        this.theMessage = this.router.getCurrentNavigation().extras.state.theMessage;

        if (this.theOk === true) {
          document.querySelector(".ok-or-not").classList.add("ok");
          this.theThumbs = "thumbs-up";
        } else {
          document.querySelector(".ok-or-not").classList.add("not-ok");
          this.theThumbs = "thumbs-down";
        }

        if (this.theLogout === true) {
          setTimeout(() => {this.afAuth.auth.signOut();}, 6200);
        } else if (this.theRoute != false) {
          setTimeout(() => {this.router.navigate([this.theRoute])}, 6500);
        } else {
          setTimeout(() => {this.router.navigate(["/tabs"])}, 6500);
        }
      }
    });
  }

  ngOnInit() {
  }

}
