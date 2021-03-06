import {Injectable} from '@angular/core';
import {Client} from './beon-api';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class VehicleService {
  private apiClient: any;

  constructor(private http: HttpClient) {
    this.apiClient = new Client(http, "https://beonadvertising.com");
  }

  getVehicleModels() {
    return this.apiClient.getVehicleModels();
  }
}
