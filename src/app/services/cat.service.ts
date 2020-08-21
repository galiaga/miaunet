import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  saveCat(cat: Cat): Observable<any> {
    let params = JSON.stringify(cat);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + '/save-cat', params, {
      headers: headers,
    });
  }

  getCats(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(this.url + '/cats', { headers: headers });
  }

  getCat(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(this.url + '/cat/' + id, { headers: headers });
  }

  deleteCat(id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.delete(this.url + '/cat/' + id, { headers: headers });
  }

  updateCat(cat): Observable<any> {
    let params = JSON.stringify(cat);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.put(this.url + '/cat/' + cat._id, params, {
      headers: headers,
    });
  }
}
