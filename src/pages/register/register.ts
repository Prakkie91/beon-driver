import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {HomePage} from "../home/home";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VehicleService} from "../../services/vehicle-service";
import {Observable} from "rxjs";
import {
  Country,
  DriverSignUpRequest,
  SwaggerException,
  VehicleBrand,
  VehicleCategory
} from "../../services/beon-api";
import {UserService} from "../../services/user-service";
import {Storage} from "@ionic/storage";

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
  userAddressInfo: FormGroup;
  submitAttempt: boolean = false;

  vehicleCategories: Observable<VehicleCategory>;
  vehicleBrands: Observable<VehicleBrand>;
  countries: Observable<Country>;
  public loading: boolean = true;

  constructor(public nav: NavController, public formBuilder: FormBuilder, public vehicleService: VehicleService, public userService: UserService, private storage: Storage) {

    this.checkIfLoggedIn();
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

    this.userAddressInfo = formBuilder.group({
      address: ['', Validators.compose([Validators.required])],
      country: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      zipCode: ['', Validators.compose([Validators.required, Validators.maxLength(5)])]
    });

    this.vehicleCategories = vehicleService.getVehicleCategories();
    this.vehicleBrands = vehicleService.getVehicleBrands();
    this.countries = userService.getCountries();

    let self = this;
    Promise.all([
      self.vehicleCategories.toPromise(),
      self.vehicleBrands.toPromise(),
      self.countries.toPromise(),
    ]).then(a =>
      setTimeout(() => {
        this.loading = false;
      }, 500));
  }

  next(page: number) {
    this.submitAttempt = true;

    if (this.userBasicInfo.valid || this.userVehicleInfo.valid) {
      this.signupPage = page;
      this.submitAttempt = false;
    }
  }

  signup() {
    this.submitAttempt = true;
    if (this.userBasicInfo.valid) {
      let signUpRequest = new DriverSignUpRequest();
      signUpRequest.email = this.userBasicInfo.value.email;
      signUpRequest.password = this.userBasicInfo.value.password;
      signUpRequest.fullName = this.userBasicInfo.value.name;
      signUpRequest.phoneNumber = this.userBasicInfo.value.phone;

      signUpRequest.address = this.userAddressInfo.value.address;
      signUpRequest.countryId = this.userAddressInfo.value.country;
      signUpRequest.state = this.userAddressInfo.value.state;
      signUpRequest.zipcode = this.userAddressInfo.value.zipcode;

      signUpRequest.vehicleBrandId = this.userVehicleInfo.value.brand;
      signUpRequest.vehicleModel = this.userVehicleInfo.value.model;
      signUpRequest.vehicleCategoryId = this.userVehicleInfo.value.type;
      signUpRequest.vehiclePlateNumber = this.userVehicleInfo.value.numberPlate;

      let request = this.userService.signUp(signUpRequest);
      request.then((value) =>
          this.loginUser(this.userBasicInfo.value.email),
        (err: SwaggerException) => alert(err.response));
    }
  }

  loginUser(username: string) {
    this.storage.set('userName', username).then(a =>
      this.nav.setRoot(HomePage));
  }

  login() {
    this.nav.setRoot(LoginPage);
  }

  checkIfLoggedIn() {
    let self = this;
    return this.storage.get("userName")
      .then(function (driverId) {
        if (driverId) {
          self.nav.setRoot(HomePage);
        }
      });
  }

}
