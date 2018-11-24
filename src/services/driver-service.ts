import {Injectable} from '@angular/core';
import {Client} from './beon-api';
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";

@Injectable()
export class DriverService {
  private apiClient: any;
  private driverId: string;

  constructor(private http: HttpClient, private storage: Storage) {
    this.apiClient = new Client(http, "http://beonadvertising.com");
  }

  getCurrentDriver() {
    return this.storage.get("DriverId").then(a => this.driverId = a)
        .then(()=>this.apiClient.getDriverInfo(this.driverId, true));
  }
}
