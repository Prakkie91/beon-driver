import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {JobService} from '../../services/job-service';
import {PickOffPage} from '../pick-off/pick-off';
/*
  Generated class for the PickUpPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pick-up',
  templateUrl: 'pick-up.html'
})
export class PickUpPage {
  // job info
  public job: any;

  constructor(public nav: NavController, public jobService: JobService) {
    // get job info from service
    this.job = jobService.getItem(1);
  }

  // pick off
  pickup() {
    this.nav.setRoot(PickOffPage);
  }
}
