import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { DriverService } from '../../services/driver-service';
import { LocationTrackingService } from '../../services/location-tracking';
import { DriverInfoResponse } from "../../services/beon-api";
import { Observable } from "rxjs";
import { Storage } from "@ionic/storage";

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  // driver info
  public driver: Observable<DriverInfoResponse>;
  public loading: boolean = true;

  constructor(public nav: NavController, private driverService: DriverService, public modalCtrl: ModalController,
    public alertCtrl: AlertController, public locationTrackingService: LocationTrackingService, private storage: Storage) {
    this.driver = this.driverService.getCurrentDriver();
    this.driver.subscribe(a => {
      setTimeout(() => {
        this.loading = false;
      }, 500)
    }
    );
  }
}

