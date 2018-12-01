import {Injectable} from '@angular/core';
import {Client, DriverSignUpRequest, LoginResponse, SignUpResponse} from './beon-api';
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

    let request =this.apiClient.signUp(data);

    request.subscribe((value:SignUpResponse)=> {
        this.storage.set("userName", value.userName);
        this.storage.set("fullName", value.fullName);
        this.storage.set("primaryVehicleId", value.primaryVehicleId);
        this.storage.set("profileImage", value.profileCloudinaryImage.baseUrl + value.profileCloudinaryImage.relativePath);
      });

    return request;
  }

   login(username: string, password: string) {
     let request = this.apiClient.login(username, password);


     request.subscribe((value:LoginResponse)=> {
       console.log(value);

       this.storage.set("userName", value.userName);
       this.storage.set("fullName", value.fullName);
       this.storage.set("primaryVehicleId", value.primaryVehicleId);
       this.storage.set("profileImage", value.profileCloudinaryImage.baseUrl + value.profileCloudinaryImage.relativePath);
     });

     return request;
  }

}
