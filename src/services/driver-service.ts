import {Injectable} from '@angular/core';
import {Client, DriverInfoResponse} from './beon-api';
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {Observable} from "rxjs";
import {Globals} from "./Globals";

@Injectable()
export class DriverService {
  private apiClient: any;
  public driver: DriverInfoResponse;

  constructor(private http: HttpClient, private storage: Storage, private globals: Globals) {
    this.apiClient = new Client(http, "http://beonadvertising.com");
    globals.userName = "dsfsdf";
  }

  getCurrentDriver() {
    return this.driver
      ? Observable.of(this.driver)
      : this.storage.get("userName").then(a => {
        let request = this.apiClient.getDriverInfo(a, true);
        request.toPromise().then(a => {
          this.driver = a;
          this.globals.userName = a.userName;
        });
        return request;
      }
    );
  }
}
