import {NgModule} from '@angular/core';
import {IonicApp, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import { LocationTrackingService } from '../services/location-tracking';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation';


// import services
import {DriverService} from '../services/driver-service';
import {JobService} from '../services/job-service';
import {ReportService} from '../services/report-service';
import {TransactionService} from '../services/transaction-service';
// end import services

// import pages
import {HomePage} from '../pages/home/home';
import {JobRequestsPage} from '../pages/job-requests/job-requests';
import {LoginPage} from '../pages/login/login';
import {ModalJobPage} from '../pages/modal-job/modal-job';
import {PickOffPage} from '../pages/pick-off/pick-off';
import {PickUpPage} from '../pages/pick-up/pick-up';
import {ProfilePage} from '../pages/profile/profile';
import {RegisterPage} from '../pages/register/register';
import {SettingPage} from '../pages/setting/setting';
import {SupportPage} from '../pages/support/support';
import {WalletPage} from '../pages/wallet/wallet';
// end import pages

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    JobRequestsPage,
    LoginPage,
    ModalJobPage,
    PickOffPage,
    PickUpPage,
    ProfilePage,
    RegisterPage,
    SettingPage,
    SupportPage,
    WalletPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    JobRequestsPage,
    LoginPage,
    ModalJobPage,
    PickOffPage,
    PickUpPage,
    ProfilePage,
    RegisterPage,
    SettingPage,
    SupportPage,
    WalletPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DriverService,
    JobService,
    ReportService,
    TransactionService,
    BackgroundGeolocation,
    Geolocation,
    LocationTrackingService
    /* import services */
  ]
})
export class AppModule {
}
