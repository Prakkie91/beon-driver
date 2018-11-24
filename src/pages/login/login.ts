import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {RegisterPage} from '../register/register';
import {HomePage} from '../home/home'
import {Storage} from '@ionic/storage';

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

  constructor(public nav: NavController, private storage: Storage) {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn() {
    let self = this;
    this.storage.get("DriverId")
      .then(function (driverId) {
        if (driverId) {
          self.nav.setRoot(HomePage)
        }
      });
  }

  signup() {
    this.nav.setRoot(RegisterPage);
  }

  login() {
    this.storage.set('DriverId', 'ENRICOWILLEMSE.WAS@GMAIL.COM').then(a =>
      this.nav.setRoot(HomePage));
  }
}
