import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {HomePage} from "../home/home";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

/*
  Generated class for the RegisterPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  signupPage: number = 1;
  userBasicInfo: FormGroup;
  userVehicleInfo: FormGroup;
  submitAttempt: boolean = false;

  constructor(public nav: NavController, public formBuilder: FormBuilder) {
    this.userBasicInfo = formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });

    this.userVehicleInfo = formBuilder.group({
      type: ['', Validators.compose([Validators.required])],
      brand: ['', Validators.compose([Validators.required])],
      model: ['', Validators.compose([Validators.required])],
      numberPlate: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }

  next() {
    this.submitAttempt = true;
    if (this.userBasicInfo.valid) {
      this.signupPage = 2;
      this.submitAttempt = false;
    }
  }

  signup() {
    this.submitAttempt = true;
    if (this.userBasicInfo.valid) {
      this.nav.setRoot(HomePage);
    }
  }

  login() {
    this.nav.setRoot(LoginPage);
  }
}
