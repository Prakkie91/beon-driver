import {Component} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {RegisterPage} from '../register/register';
import {HomePage} from '../home/home'
import {Storage} from '@ionic/storage';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user-service";
import {SwaggerException} from "../../services/beon-api";
import {TransactionService} from "../../services/transaction-service";
import { Keyboard } from 'ionic-angular';
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
  public loading: boolean = true;
  constructor(public nav: NavController,
              private storage: Storage,
              public formBuilder: FormBuilder,
              public userService: UserService,
              private alertCtrl: AlertController,
              private keyboard: Keyboard) {
    this.checkIfLoggedIn();

    this.userBasicInfo = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });
    setTimeout(() => {
      this.loading = false;
    }, 500);
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
      (err:SwaggerException) => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: JSON.parse(err.response).messages.join(),
          buttons: ['Dismiss']
        });
        alert.present();
      }

    );
  }
}
