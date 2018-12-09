import {Component} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {JobService} from '../../services/job-service';
import {Observable} from "rxjs";
import {JobOffersResponse} from "../../services/beon-api";
import {TransactionService} from "../../services/transaction-service";

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

  public records: Observable<JobOffersResponse[]>;
  public loading: boolean = true;

  constructor(public nav: NavController, public jobService: JobService, private alertCtrl: AlertController) {
    jobService.getAll().then(a => {
      this.records = a;
      this.records.subscribe(a => {
          setTimeout(() => {
            this.loading = false;
          }, 500);
        },
        e => {
          this.showErrorAlert();
          setTimeout(() => {
            this.loading = false;
          }, 500);
        }
      );
    });
  }

  accept(id: number) {
    this.jobService.accept(id).subscribe(a => {
        this.jobService.getAll().then(a => {
          this.records = a;
        });
        this.showSuccessAlert('accepted');
      },
      e => this.showErrorAlert()
    );
  }

  reject(id: number) {
    this.jobService.reject(id).subscribe(a => {
        this.jobService.getAll().then(a => {
          this.records = a;
        });
        this.showSuccessAlert('rejected');
      },
      e => this.showErrorAlert()
    );
  }

  showSuccessAlert(type: string) {
    if (type == 'accepted') {
      let alert = this.alertCtrl.create({
        title: 'Successfully accepted job!',
        subTitle: 'We will get in contact with you within the next two days, to discuss installation',
        buttons: ['Dismiss']
      });
      alert.present();
    }
    else if (type == 'rejected') {
      let alert = this.alertCtrl.create({
        title: 'Successfully rejected job :(',
        subTitle: 'This job will be allocated to one of our other drivers, stay active to get more offers',
        buttons: ['Dismiss']
      });
      alert.present();
    }
  }

  showErrorAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Something went wrong, please get in contact with us as soon as possible',
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
