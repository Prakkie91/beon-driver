import {Component} from '@angular/core';
import {ViewController} from 'ionic-angular';
import {JobService} from '../../services/job-service';

/*
  Generated class for the ModalJobPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modal-job',
  templateUrl: 'modal-job.html'
})
export class ModalJobPage {
  // job info
  public job: any;

  // remaining time for countdown
  public remainingTime = 20;

  constructor(public viewCtrl: ViewController, public jobService: JobService) {
    // get job info from service
    this.job = jobService.getItem(1);

    // start count down
    this.countDown();
  }

  // close modal
  close() {
    this.viewCtrl.dismiss();
  }

  // count down
  countDown() {
    let interval = setInterval(() => {
      this.remainingTime--;

      // if time is over
      if (this.remainingTime == 0) {
        // stop interval
        clearInterval(interval)
        this.viewCtrl.dismiss();
      }
    }, 1000);
  }

  // accept job
  accept() {
    // close and accept a job
    this.viewCtrl.dismiss(true);
  }
}
