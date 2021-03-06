import {Component} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {HomePage} from "../home/home";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VehicleService} from "../../services/vehicle-service";
import {Observable} from "rxjs";
import {
  DriverSignUpRequest,
  SwaggerException,
  VehicleModel
} from "../../services/beon-api";
import {UserService} from "../../services/user-service";
import {Storage} from "@ionic/storage";
import { TabsPage } from '../tabs/tabs';


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
  masks: any;
  signupPage: number = 1;
  userBasicInfo: FormGroup;
  submitAttempt: boolean = false;

  vehicleModels: Observable<VehicleModel>;
  public loading: boolean = true;

  constructor(public nav: NavController, public formBuilder: FormBuilder, public vehicleService: VehicleService, public userService: UserService, private storage: Storage, private alertCtrl: AlertController) {

    this.checkIfLoggedIn();

    this.userBasicInfo = formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      model: ['', Validators.compose([Validators.required])],
      numberPlate: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });

    this.masks = {phoneNumber: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]};

    this.vehicleModels = vehicleService.getVehicleModels();

    let self = this;
    Promise.all([
      self.vehicleModels.toPromise(),
    ]).then(a =>
      setTimeout(() => {
        this.loading = false;
      }, 500));
  }

  signup() {
    this.submitAttempt = true;
    if (this.userBasicInfo.valid) {
      let signUpRequest = new DriverSignUpRequest();
      signUpRequest.email = this.userBasicInfo.value.email;
      signUpRequest.password = this.userBasicInfo.value.password;
      signUpRequest.fullName = this.userBasicInfo.value.name;
      signUpRequest.phoneNumber = this.userBasicInfo.value.phone;
      signUpRequest.identityNumber = "";

      signUpRequest.vehicleModelId = this.userBasicInfo.value.model;
      signUpRequest.vehiclePlateNumber = this.userBasicInfo.value.numberPlate;

      let request = this.userService.signUp(signUpRequest);
      request.then((value) =>
          this.loginUser(this.userBasicInfo.value.email),
        (err: SwaggerException) => {
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

  loginUser(username: string) {
    this.storage.set('userName', username).then(a =>
      this.nav.setRoot(TabsPage));
  }

  login() {
    this.nav.setRoot(LoginPage);
  }

  checkIfLoggedIn() {
    let self = this;
    return this.storage.get("userName")
      .then(function (driverId) {
        if (driverId) {
          self.nav.setRoot(TabsPage);
        }
      });
  }

}
