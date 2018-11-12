import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {JobService} from '../../services/job-service';
import {HomePage} from '../home/home';

/*
  Generated class for the PickOffPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pick-off',
  templateUrl: 'pick-off.html'
})
export class PickOffPage {
  // job info
  public job: any;

  constructor(public nav: NavController, public jobService: JobService, public alertCtrl: AlertController) {
    // get job info from service
    this.job = jobService.getItem(1);
  }

  // show payment popup
  showPayment() {
    let prompt = this.alertCtrl.create({
      title: 'Total (cash):',
      message: '<h1>$2.5</h1>',
      buttons: [
        {
          text: 'OK',
          handler: data => {
            // comeback to home page
            this.nav.setRoot(HomePage);
          }
        }
      ]
    });

    prompt.present();
  }
}
