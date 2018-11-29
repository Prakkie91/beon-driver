import {Injectable} from '@angular/core';
import {Client, DriverSignUpRequest} from './beon-api';
import {HttpClient} from "@angular/common/http";
import {NavController} from "ionic-angular";
import {Storage} from "@ionic/storage";

@Injectable()
export class UserService {
  private apiClient: any;

  constructor(private http: HttpClient, private storage: Storage) {
    this.apiClient = new Client(http, "http://beonadvertising.com");
  }

   getCountries() {
    return this.apiClient.getCountries();
  }

   signUp(data: DriverSignUpRequest) {
    return this.apiClient.signUp(data);
  }

   login(username: string, password: string) {
    return this.apiClient.login(username, password);
  }

}
