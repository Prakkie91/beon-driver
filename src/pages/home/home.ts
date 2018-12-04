import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController, ModalController, AlertController} from 'ionic-angular';
import {DriverService} from '../../services/driver-service';
import {ModalJobPage} from '../modal-job/modal-job';
import {PickUpPage} from "../pick-up/pick-up";
import {LocationTrackingService} from '../../services/location-tracking';
import {DriverInfoResponse} from "../../services/beon-api";
import {Observable} from "rxjs";
import {from} from "rxjs/observable/from";
import {Storage} from "@ionic/storage";

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  // driver info
  public driver: Observable<DriverInfoResponse>;
  public x: number;
  public y: number;
  public marker: any;
  public icon: any;
  public isTracking: boolean = false;


  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public nav: NavController, public driverService: DriverService, public modalCtrl: ModalController,
              public alertCtrl: AlertController, public locationTrackingService: LocationTrackingService, private storage: Storage) {
    this.driverService.getCurrentDriver().then(a =>{
      this.driver = a;
    });
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    let mapOptions = {
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    this.locationTrackingService.geolocation.watchPosition().subscribe((position) => {
      this.x = position.coords.longitude;
      this.y = position.coords.latitude;
      let latLng = new google.maps.LatLng(this.y, this.x);
      // using global variable:
      this.map.panTo(latLng);
      this.marker.rotation = position.coords.heading;//<-- Car angle

      this.marker.setPosition(latLng);

    }, (err) => {
      alert(err);
      console.log(err);
    });


  }


  // make array with range is n
  range(n) {
    return new Array(n);
  }

  // confirm a job
  confirmJob() {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            // go to pickup page
            this.nav.setRoot(PickUpPage);
          }
        }
      ]
    });
    confirm.present();
  }
}
