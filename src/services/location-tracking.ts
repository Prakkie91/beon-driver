import {Injectable, NgZone} from '@angular/core';
import {BackgroundGeolocation} from '@ionic-native/background-geolocation';
import {Geolocation, Geoposition} from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import {HttpClient} from "@angular/common/http";
import {Client, CreateTrackingEventRequest} from "./beon-api";
import {HomePage} from "../pages/home/home";
import {Storage} from "@ionic/storage";
import {LoginPage} from "../pages/login/login";
import {DriverService} from "./driver-service";
import {NavController} from "ionic-angular";

@Injectable()
export class LocationTrackingService {

  public watch: any;
  public lat: number = 0;
  public lng: number = 0;
  private apiClient: any;
  private vehicleId: number;

  constructor(public zone: NgZone, public backgroundGeolocation: BackgroundGeolocation, public geolocation: Geolocation, private http: HttpClient, private storage: Storage, public driverService: DriverService) {
    this.apiClient = new Client(http, "http://beonadvertising.com");
  }

  startTracking() {
    let self = this;
    this.storage.get("VehicleId")
      .then(function (vehicleId) {
        if (!vehicleId) {
          self.driverService.getCurrentDriver().then(a => this.driver = a);
          this.driver.subscribe((driver)=>{
            self.storage.set('VehicleId', driver.vehicleModel.id);
            self.vehicleId = driver.vehicleModel.id;
          });
        }
        else {
          self.vehicleId = vehicleId
        }
      });
    // Background Tracking

    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 10000
    };

    this.backgroundGeolocation.configure(config).subscribe((location) => {

      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
      let request = new CreateTrackingEventRequest();
      request.latitude = location.latitude;
      request.altitude = location.altitude;
      request.longitude = location.longitude;
      request.driverVehicleId = this.vehicleId;

      this.apiClient.driverVehicleTrackingEvent(request);
      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;
      });

    }, (err) => {

      console.log(err);

    });

    // Turn ON the background-geolocation system.
    this.backgroundGeolocation.start();


    // Foreground Tracking

    let options = {
      frequency: 3000,
      enableHighAccuracy: true
    };

    this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {

      console.log(position);

      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });

    });

  }

  stopTracking() {

    console.log('stopTracking');

    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();

  }

}
