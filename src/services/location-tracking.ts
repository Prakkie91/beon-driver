import {Injectable, NgZone} from '@angular/core';
import {BackgroundGeolocation, BackgroundGeolocationResponse} from '@ionic-native/background-geolocation';
import {Geolocation, Geoposition} from '@ionic-native/geolocation';
import {Storage} from "@ionic/storage";
import {Device} from '@ionic-native/device';
import {Platform} from "ionic-angular";
import {Client, CreateTrackingEventRequest, UpdateVehicleDeviceIdRequest} from "./beon-api";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class LocationTrackingService {

  public watch: any;
  public lat: number = 0;
  public lng: number = 0;

  public request = [];
  public uuid: string;

  private apiClient: any;

  constructor(public http: HttpClient,
              public zone: NgZone,
              public backgroundGeolocation: BackgroundGeolocation,
              public geolocation: Geolocation,
              private storage: Storage,
              private device: Device,
              private platform: Platform) {
    this.apiClient = new Client(http, "https://beonadvertising.com");

    platform.ready().then(() => {
      this.uuid = this.device.uuid;
      this.startTracking();
    });
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
      distanceFilter: 30,
      debug: false,
      stopOnStillActivity: false,
      interval: 10000,
      stopOnTerminate: false,
      startOnBoot: true,
    };

    this.backgroundGeolocation.configure(config).subscribe((location: BackgroundGeolocationResponse) => {
      try {
        let singleRequest = new CreateTrackingEventRequest();
        singleRequest.longitude = location.longitude;
        singleRequest.latitude = location.latitude;
        singleRequest.time = location.time;

        this.request.push(singleRequest);

        if (this.request.length >= 10) {
          this.apiClient.driverVehicleTrackingEvent(this.uuid, this.request).subscribe(a => {
            this.request = [];
          });
        }
      }
      catch (e) {

      }
      // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
      // and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
      // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
      this.backgroundGeolocation.finish().then(a => console.log(a)); // FOR IOS ONLY

    });
    // Turn ON the background-geolocation system.
    this.backgroundGeolocation.start().then(a => console.log(a));
  }

}
