import { Injectable } from '@angular/core';
import { Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  public apiurl = 'http://0.0.0.0:5000/'

  constructor(public http: HttpClient) { }

  public getConsumers() {
    return this.getData('consumers');
  }

  public getDepartments() {
    return this.getData('departments');
  }

  public getPurchases(limit?: number) {
    if (limit) {
      return this.getData('purchases/' + limit.toString());
    }
    return this.getData('purchases');
  }

  public getConsumer(id: number) {
    return this.getData('consumer/' + id.toString());
  }

  public getConsumerPurchases(id: number) {
    return this.getData('consumer/' + id.toString() + '/purchases');
  }

  public getConsumerDeposits(id: number) {
    return this.getData('consumer/' + id.toString() + '/deposits');
  }

  public getConsumerFavorites(id: number) {
    return this.getData('consumer/' + id.toString() + '/favorites');
  }

  public getProducts() {
    return this.getData('products');
  }

  public getStatus() {
    return this.getData('status');
  }

  public insertPurchase(data) {
    return this.postData('purchases', data);
  }

  public revokePurchase(purchase) {
    let data = {
      id: purchase.id,
      revoked: true
    };
    return this.putData('purchases/' + purchase.id.toString(), data);
  }


  private getBackendStatus() {
    this.http.get(this.apiurl + 'status', {});
  }

  private getData(route) {
    this.getBackendStatus();
    return this.http.get(this.apiurl + route, {});
  }

  private postData(route, data) {
    this.getBackendStatus();
    let token = localStorage.getItem('token');
    if (typeof token === 'undefined' || token === null) {
      token = '';
    }
    return this.http.post(this.apiurl + route, data, {
      headers: {
        token: token
      }
    });
  }

  private putData(route, data) {
    this.getBackendStatus();
    let token = localStorage.getItem('token');
    if (typeof token === 'undefined' || token === null) {
      token = '';
    }
    return this.http.put(this.apiurl + route, data, {
      headers: {
        token: token
      }
    });
  }
}
