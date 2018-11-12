import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TransactionService} from '../../services/transaction-service';

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
  public records: any;

  constructor(public nav: NavController, public transactionService: TransactionService) {
    // get transactions from service
    this.records = transactionService.getAll();
  }
}
