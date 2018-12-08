import {Injectable, NgZone} from '@angular/core';
import {BackgroundGeolocation} from '@ionic-native/background-geolocation';
import {Geolocation, Geoposition} from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import {Storage} from "@ionic/storage";
import {Device} from '@ionic-native/device';
import {Platform} from "ionic-angular";
import {Client, UpdateVehicleDeviceIdRequest} from "./beon-api";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class LocationTrackingService {

  public watch: any;
  public lat: number = 0;
  public lng: number = 0;
  private uuid: string;

  private apiClient: any;

  constructor(private http: HttpClient,
              public zone: NgZone,
              public backgroundGeolocation: BackgroundGeolocation,
              public geolocation: Geolocation,
              private storage: Storage,
              private device: Device,
              private platform: Platform) {
    this.apiClient = new Client(http, "http://beonadvertising.com");
    this.startTracking();
  }

  updateUuid(vehicleId: number) {
    let request = new UpdateVehicleDeviceIdRequest();
    request.deviceId = this.device.uuid == null ? "something" : this.device.uuid;
    request.vehicleId = vehicleId;
    return this.apiClient.updateVehicleDeviceId(request).toPromise();
  }

  startTracking() {
    let self = this;
    self.foregroundTracking();
    if (this.platform.is('cordova')) {
      self.backgroundTracking();
    }
  }

  foregroundTracking() {
    // Foreground Tracking

    let options = {
      frequency: 1000,
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
      distanceFilter: 10,
      debug: false,
      interval: 1000,
      stopOnTerminate: false,
      startOnBoot: true,
      syncUrl: 'http://beonadvertising.com/api/DriverVehicleTrackingEvents/DriverVehicleTrackingEvent/' + this.device.uuid,
    };

    this.backgroundGeolocation.configure(config).subscribe(a=>console.log(a));
    // Turn ON the background-geolocation system.
    this.backgroundGeolocation.start();
  }

  stopTracking() {
    console.log('stopTracking');
    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();
  }

}
