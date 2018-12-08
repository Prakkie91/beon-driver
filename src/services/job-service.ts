import {Injectable} from "@angular/core";
import {JOBS} from "./mock-jobs";
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {Client} from "./beon-api";

@Injectable()
export class JobService {
  private apiClient: any;

  constructor(private http: HttpClient, private storage: Storage) {
    this.apiClient = new Client(http, "http://beonadvertising.com");
  }

  getAll() {
    return this.storage.get("userName").then(a =>
      this.apiClient.getJobOffers(a)
    );
  }

  accept() {
  }

  reject() {
  }
}
