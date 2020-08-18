import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Cat } from '../models/cat';
import { global } from './global';

@Injectable()
export class CatService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }
  testService() {
    return 'Probando el servicio de Angular';
  }

  saveCat(cat: Cat) {
    let params = JSON.stringify(cat);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
  }
}
