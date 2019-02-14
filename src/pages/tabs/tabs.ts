import { Component } from '@angular/core';

import {HomePage} from '../home/home';
import {WalletPage} from '../wallet/wallet';
import {JobRequestsPage} from '../job-requests/job-requests';
import {SettingPage} from '../setting/setting';
import {LoginPage} from '../login/login';
import {Storage} from "@ionic/storage";
import { ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'tabs-page',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = WalletPage;
  tab3Root = JobRequestsPage;
  tab4Root = SettingPage;

  constructor(private storage: Storage, public navCtrl: NavController) {
  }

  
  logout() {
    this.storage.remove("userName").then(a =>
      this.navCtrl.push(LoginPage)
  );
  }
}
