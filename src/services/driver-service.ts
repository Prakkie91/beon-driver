import {Injectable} from '@angular/core';
import {Client} from './beon-api';

@Injectable()
export class DriverService {
  private apiClient: any;

  constructor() {
    this.apiClient = new Client("http://beonadvertising.com");
  }

  getCurrentDriver() {
    let info =this.apiClient.getDriverInfo("ENRICOWILLEMSE.WAS@GMAIL.COM", true);

    return info;
  }
}
