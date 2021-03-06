import {Injectable} from '@angular/core';
import {Client, DriverInfoResponse} from './beon-api';
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {Observable} from "rxjs";

@Injectable()
export class DriverService {
  private apiClient: any;
  public driver: Observable<DriverInfoResponse>;

  constructor(private http: HttpClient, private storage: Storage) {
    this.apiClient = new Client(http, "https://beonadvertising.com");
  }

  getCurrentDriver(): Observable<DriverInfoResponse>  {
    return Observable
      .fromPromise(this.storage.get("userName"))
      .flatMap(a => {
        let request = this.apiClient.getDriverInfo(a, true);
        this.driver = request;
        return request;
      });
  }
}
