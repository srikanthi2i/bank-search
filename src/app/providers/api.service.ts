import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HOST } from 'src/app/environments/environments';

interface ServiceRequest {
  get(url: string, options?: any): Observable<any>;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService implements ServiceRequest {

  constructor(private http: HttpClient) {}

  get(url): Observable<object> {
    return  this.http.get(url);
  }

}
