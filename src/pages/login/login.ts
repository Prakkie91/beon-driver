import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RegisterPage} from '../register/register';
import {HomePage} from '../home/home'
import {Storage} from '@ionic/storage';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user-service";
import {SwaggerException} from "../../services/beon-api";

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  userBasicInfo: FormGroup;

  constructor(public nav: NavController, private storage: Storage, public formBuilder: FormBuilder, public userService: UserService) {
    this.checkIfLoggedIn();

    this.userBasicInfo = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });

  }

  checkIfLoggedIn() {
    let self = this;
    this.storage.get("userName")
      .then(function (driverId) {
        if (driverId) {
          self.nav.setRoot(HomePage);
        }
      });
  }

  signup() {
    this.nav.setRoot(RegisterPage);
  }

  login() {
    this.userService.login(this.userBasicInfo.value.email,
      this.userBasicInfo.value.password).then(
      (value) => this.nav.setRoot(HomePage),
      (err:SwaggerException) => alert(err.response)
    );
  }
}
