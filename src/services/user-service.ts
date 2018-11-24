import {Injectable} from '@angular/core';
import {Client, DriverSignUpRequest} from './beon-api';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UserService {
  private apiClient: any;

  constructor(private http: HttpClient) {
    this.apiClient = new Client(http, "http://beonadvertising.com");
  }

  public getCountries() {
    return this.apiClient.getCountries();
  }

  public signup(username: string,
                password: string,
                countryId: number,
                state: string,
                zipCode: string,
                address: string,
                vehicleCategoryClassId: number,
                vehicleBrandId: number,
                vehicleModel: string,
                vehicleCondition: number,
                name: string,
                surname: string,
                phoneNumber: string,
                vehiclePlateNumber: string) {

    let signUpRequest = new DriverSignUpRequest();
    signUpRequest.email = username;
    signUpRequest.countryId = countryId;
    signUpRequest.state = state;
    signUpRequest.zipcode = zipCode;
    signUpRequest.address = address;
    signUpRequest.vehicleCategoryClassId = vehicleCategoryClassId;
    signUpRequest.vehicleBrandId = vehicleBrandId;
    signUpRequest.vehicleModel = vehicleModel;
    signUpRequest.fullName = name;
    signUpRequest.phoneNumber = phoneNumber;
    signUpRequest.vehiclePlateNumber = vehiclePlateNumber;

    return this.apiClient.signUp(signUpRequest);
  }

  public login(username: string, password: string) {
    return this.apiClient.login(username, password);
  }

}
