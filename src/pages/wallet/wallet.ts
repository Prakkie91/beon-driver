import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TransactionService} from '../../services/transaction-service';
import {Observable} from "rxjs";
import {WalletResponse} from "../../services/beon-api";
import {AlertController} from 'ionic-angular';

/*
  Generated class for the WalletPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html'
})
export class WalletPage {
  // list of transactions
  public records: Observable<WalletResponse>;

  public canWithdraw: boolean = false;

  constructor(public nav: NavController, public transactionService: TransactionService, private alertCtrl: AlertController) {
    // get transactions from service
    transactionService.getAll().then(a => {
      this.records = a;
    });
  }

  withDraw() {
    this.transactionService.withDraw().then(
      w => {
        w.subscribe(s => {
            this.showSuccessAlert();
            this.transactionService.getAll().then(a => this.records = a);
          },
          e => this.showErrorAlert()
        );
      },
      e => this.showErrorAlert())
  }

  showSuccessAlert() {
    let alert = this.alertCtrl.create({
      title: 'Payout requested',
      subTitle: 'We will process your payout within the next two days',
      buttons: ['Dismiss']
    });
    alert.present();
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
