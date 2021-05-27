import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, NavigationExtras } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-change-name',
  templateUrl: './change-name.page.html',
  styleUrls: ['./change-name.page.scss'],
})
export class ChangeNamePage implements OnInit {

  validationsForm: FormGroup;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public formBuilder: FormBuilder,
    public global: GlobalService
  ) {
  }

  bye() {
    this.afAuth.auth.signOut().then(() => {
      window.location.href = "/home";
    });
  }

  ngOnInit() {
    this.validationsForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
    });
  }

  validationMessages = {
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
  };

  navigationExtras: NavigationExtras = {
    state: {
      theOk: true,
      theLogout: false,
      theRoute: "/tabs/config",
      theMessage: ""
    }
  }

  onSubmit(values) {
    this.afAuth.auth.currentUser.updateProfile({
      displayName: values.name
    }).then(() => {
      this.navigationExtras.state.theOk = true;
      this.navigationExtras.state.theMessage = "Changes made";
      this.router.navigate(["/ok-or-not"], this.navigationExtras);
    }).catch((error) => {
      console.log(error);
      this.navigationExtras.state.theOk = false;
      this.navigationExtras.state.theMessage = "Something went wrong!";
      this.router.navigate(["/ok-or-not"], this.navigationExtras);
    });
  }

} // export end
