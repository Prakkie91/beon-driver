import {NgModule} from '@angular/core';
import {IonicApp, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import { Pro } from '@ionic/pro';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { IonicErrorHandler } from 'ionic-angular';

import { LocationTrackingService } from '../services/location-tracking';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClientModule } from '@angular/common/http';

// import services
import {DriverService} from '../services/driver-service';
import {JobService} from '../services/job-service';
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
import { Device } from '@ionic-native/device';
import { IonicStorageModule } from '@ionic/storage';
import {VehicleService} from "../services/vehicle-service";
import {UserService} from "../services/user-service";

Pro.init('b4069d91', {
  appVersion: '1.0.6'
});

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch(e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  handleError(err: any): void {
    Pro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}

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
    HttpClientModule,
    IonicModule.forRoot(MyApp, { scrollAssist: false, autoFocusAssist: false }),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
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
    UserService,
    VehicleService,
    JobService,
    TransactionService,
    BackgroundGeolocation,
    Geolocation,
    LocationTrackingService,
    IonicErrorHandler,
    Device,
    [{ provide: ErrorHandler, useClass: MyErrorHandler }],
    /* import services */

  ]

})
export class AppModule {
}
