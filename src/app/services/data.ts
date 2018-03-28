import { Injectable } from '@angular/core';
import { Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  private apiurl = 'http://0.0.0.0:5000/'

  constructor(public http: HttpClient) { }

  public getConsumers() {
    return this.getData('consumers');
  }

  public getPurchases(limit?: number) {
    if (limit) {
      return this.getData('purchases/' + limit.toString());
    }
    return this.getData('purchases');
  }

  public getProducts() {
    return this.getData('products');
  }

  public getStatus() {
    return this.getData('status');
  }

  public getError() {
    return this.getData('error');
  }

  private getBackendStatus() {
    this.http.get(this.apiurl + 'status', {});
  }
  private getData(route) {
    this.getBackendStatus();
    return this.http.get(this.apiurl + route, {});
  }

}
