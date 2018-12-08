import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {JobService} from '../../services/job-service';
import {Observable} from "rxjs";
import {JobOffer, WalletEntry} from "../../services/beon-api";

/*
  Generated class for the JobHistoryPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-job-history',
  templateUrl: 'job-requests.html'
})
export class JobRequestsPage {

  public records: Observable<JobOffer[]>;

  constructor(public nav: NavController, public jobService: JobService) {
    jobService.getAll().then(a => {
      this.records = a;
    });
  }

  accept()
  {

  }

  reject(){

  }
}
