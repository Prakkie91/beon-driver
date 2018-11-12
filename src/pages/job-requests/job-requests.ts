import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {JobService} from '../../services/job-service';
import {ReportService} from '../../services/report-service';

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

  // statistic
  public stats: any;

  // list of records
  public records: any;

  constructor(public nav: NavController, public jobService: JobService, public reportService: ReportService) {
    // set report data
    this.stats = reportService.getAll();

    // set jobs
    this.records = jobService.getAll();
  }

}
