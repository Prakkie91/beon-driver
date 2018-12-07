import {Injectable, NgZone} from '@angular/core';
import {BackgroundGeolocation} from '@ionic-native/background-geolocation';
import {Geolocation, Geoposition} from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import {Storage} from "@ionic/storage";
import {UniqueDeviceID} from '@ionic-native/unique-device-id';
import {Platform} from "ionic-angular";

@Injectable()
export class LocationTrackingService {

  public watch: any;
  public lat: number = 0;
  public lng: number = 0;
  private uuid: string;

  constructor(public zone: NgZone,
              public backgroundGeolocation: BackgroundGeolocation,
              public geolocation: Geolocation,
              private storage: Storage,
              private uniqueDeviceID: UniqueDeviceID,
              private platform: Platform) {
    this.startTracking();
  }

  startTracking() {
    let self = this;
    self.foregroundTracking();
    if (this.platform.is('cordova')) {
      this.uniqueDeviceID.get()
        .then((uuid: any) => this.uuid = uuid).then(() => {
        self.backgroundTracking();
      });
    }
  }

  foregroundTracking() {
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


  backgroundTracking() {
    let config = {
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 30,
      debug: false,
      interval: 1000,
      stopOnTerminate: false,
      startOnBoot: true,
      url: 'http://beonadvertising.com/api/DriverVehicleTrackingEvents/DriverVehicleTrackingEvent',
      postTemplate: {
        latitude: '@latitude',
        longitude: '@longitude',
        altitude: '@altitude',
        deviceId: this.uuid
      }
    };

    this.backgroundGeolocation.configure(config).subscribe((location) => {
      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
    }, (err) => {
      console.log(err);
    });

    // Turn ON the background-geolocation system.
    this.backgroundGeolocation.start();
  }

  stopTracking() {
    console.log('stopTracking');
    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();
  }

}
