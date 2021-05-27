import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.page.html',
  styleUrls: ['./policy.page.scss'],
})
export class PolicyPage implements OnInit {

  constructor(public router: Router) {
    setTimeout(() => {this.router.navigate(["/home"])}, 2500)
  }

  ngOnInit() {
  }

}
