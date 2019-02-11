import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DriverService} from '../../services/driver-service';
import {DriverInfoResponse, DriverInfoUpdateRequest,SwaggerException} from "../../services/beon-api";
import {Observable} from "rxjs";
import {UserService} from "../../services/user-service";
/*
  Generated class for the SettingPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {
  public userBasicInfo: FormGroup;
  public driver: Observable<DriverInfoResponse>;
  public loading: boolean = true;
  
  constructor(public nav: NavController, public formBuilder: FormBuilder,private driverService: DriverService, public userService: UserService, private alertCtrl: AlertController) {

    this.userBasicInfo = formBuilder.group({
      name: ["", Validators.compose([Validators.required, Validators.minLength(4)])],
      phone: ["", Validators.compose([Validators.required, Validators.minLength(10)])],
      email: ["", Validators.compose([Validators.required, Validators.email])]
    });

    this.driver = this.driverService.getCurrentDriver();
    this.driver.subscribe(a => {
      this.userBasicInfo.controls['name'].setValue(a.fullName);
      this.userBasicInfo.controls['phone'].setValue(a.phoneNumber);
      this.userBasicInfo.controls['email'].setValue(a.email);
        setTimeout(() => {
          this.loading = false;
        }, 500);
      }
    );
  }


  save() {
    if (this.userBasicInfo.valid) {
      let updateRequest = new DriverInfoUpdateRequest();
      updateRequest.email = this.userBasicInfo.value.email;
      updateRequest.fullName = this.userBasicInfo.value.name;
      updateRequest.phoneNumber = this.userBasicInfo.value.phone;
      updateRequest.isActive = true;

      let request = this.userService.updateSettings(updateRequest);
      request.then((value) =>
          {
            console.log(value);
            let alert = this.alertCtrl.create({
              title: 'Saved',
              subTitle: "Your data was successfully updated",
              buttons: ['Dismiss']
            });
            alert.present();
          },
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

}
