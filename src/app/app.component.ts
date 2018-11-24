import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

// import page
import {HomePage} from '../pages/home/home';
import {WalletPage} from '../pages/wallet/wallet';
import {JobRequestsPage} from '../pages/job-requests/job-requests';
import {SettingPage} from '../pages/setting/setting';
import {SupportPage} from '../pages/support/support';
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from "../pages/register/register";
import {Storage} from "@ionic/storage";


@Component({
  templateUrl: 'app.html',
  queries: {
    nav: new ViewChild('content')
  }
})
export class MyApp {

  public rootPage:any;

  public nav:any;

  public pages = [
    {
      title: 'Home',
      icon: 'ios-home-outline',
      count: 0,
      component: HomePage
    },
    {
      title: 'Wallet',
      icon: 'ios-albums',
      count: 0,
      component: WalletPage
    },
    {
      title: 'Job offers',
      icon: 'md-time',
      count: 0,
      component: JobRequestsPage
    },
    {
      title: 'Setting',
      icon: 'settings',
      count: 0,
      component: SettingPage
    },
    {
      title: 'Support',
      icon: 'ios-help-circle-outline',
      count: 0,
      component: SupportPage
    }
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private storage: Storage) {
    this.rootPage = RegisterPage;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout(){
    this.storage.remove("DriverId");
    this.nav.setRoot(LoginPage);
  }
}


