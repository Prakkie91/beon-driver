import {Injectable, NgZone} from '@angular/core';
import {BackgroundGeolocation} from '@ionic-native/background-geolocation';
import {Geolocation, Geoposition} from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import {HttpClient} from "@angular/common/http";
import {Client, CreateTrackingEventRequest} from "./beon-api";

@Injectable()
export class LocationTrackingService {

  public watch: any;
  public lat: number = 0;
  public lng: number = 0;
  private apiClient: any;

  constructor(public zone: NgZone, public backgroundGeolocation: BackgroundGeolocation, public geolocation: Geolocation, private http: HttpClient) {
    this.apiClient = new Client(http, "http://beonadvertising.com");
  }

  startTracking() {

    // Background Tracking

    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 2000
    };

    this.backgroundGeolocation.configure(config).subscribe((location) => {

      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
      let request = new CreateTrackingEventRequest();
      request.latitude = location.latitude;
      request.altitude = location.altitude;
      request.longitude = location.longitude;
      request.driverVehicleId = 1;

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
