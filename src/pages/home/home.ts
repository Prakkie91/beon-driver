import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController, ModalController, AlertController} from 'ionic-angular';
import {DriverService} from '../../services/driver-service';
import {ModalJobPage} from '../modal-job/modal-job';
import {PickUpPage} from "../pick-up/pick-up";
import {LocationTrackingService} from '../../services/location-tracking';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  // driver info
  public driver: any;
  public x: number;
  public  y: number;
  public marker: any;
  public icon: any;
  public isTracking:boolean = false;


  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public nav: NavController, public driverService: DriverService, public modalCtrl: ModalController,
              public alertCtrl: AlertController, public locationTrackingService: LocationTrackingService) {

    // get driver info from service
    this.driver = driverService.getCurrentDriver();

    // show modal
    let modal = this.modalCtrl.create(ModalJobPage);

    // listen for modal close
    modal.onDidDismiss(confirm => {
      if (confirm) {
        // show confirm box
        this.confirmJob();
      } else {
        // do nothing
      }
    });

    setTimeout(() => {
      modal.present();
    }, 3000);
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

     this.icon = { // car icon
      path: 'M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805',
      scale: 1,
      fillColor: "#427af4", //<-- Car Color, you can change it
      fillOpacity: 1,
      strokeWeight: 1,
      anchor: new google.maps.Point(5, 5)};

    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter(),
      icon:this.icon
    });

    this.locationTrackingService.geolocation.watchPosition().subscribe((position) => {
      this.x = position.coords.longitude;
      this.y = position.coords.latitude;
      let latLng = new google.maps.LatLng(this.y, this.x);
      // using global variable:
      this.map.panTo(latLng);
      this.marker.rotation = position.coords.heading //<-- Car angle

      this.marker.setPosition( latLng );

    }, (err) => {
      alert(err);
      console.log(err);
    });


  }


  start() {

    this.isTracking =true;
    this.locationTrackingService.startTracking();

  }

  stop() {
    this.isTracking =false;
    this.locationTrackingService.stopTracking();
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
