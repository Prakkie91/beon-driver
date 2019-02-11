import {Injectable} from '@angular/core';
import {Client, DriverSignUpRequest, LoginResponse, SignUpResponse, DriverInfoUpdateRequest} from './beon-api';
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {LocationTrackingService} from "./location-tracking";

@Injectable()
export class UserService {
  private apiClient: any;

  constructor(private http: HttpClient, private storage: Storage, private locationTrackingService: LocationTrackingService) {
    this.apiClient = new Client(http, "https://beonadvertising.com");
  }

  signUp(data: DriverSignUpRequest) {

    let request = this.apiClient.signUp(data);

    return request.toPromise().then((value: SignUpResponse) =>
      [
        this.locationTrackingService.updateUuid(value.primaryVehicleId),
        this.storage.set("userName", value.userName),
        this.storage.set("fullName", value.fullName),
        this.storage.set("primaryVehicleId", value.primaryVehicleId),
        this.storage.set("profileImage", value.profileCloudinaryImage.baseUrl + value.profileCloudinaryImage.relativePath)
      ]);
  }

  login(username: string, password: string) {
    let request = this.apiClient.login(username, password);

    return request.toPromise().then((value: LoginResponse) => {
        return [
          this.locationTrackingService.updateUuid(value.primaryVehicleId),
          this.storage.set("userName", value.userName),
          this.storage.set("fullName", value.fullName),
          this.storage.set("primaryVehicleId", value.primaryVehicleId),
          this.storage.set("profileImage", value.profileCloudinaryImage.baseUrl + value.profileCloudinaryImage.relativePath)
        ];
      }
    );
  }

  updateSettings(data: DriverInfoUpdateRequest)
  {
    return this.storage.get("userName")
      .then(a => {
      data.userName = a;
      let request = this.apiClient.updateSettings(data);
      return request.toPromise();
    });
  }

}
