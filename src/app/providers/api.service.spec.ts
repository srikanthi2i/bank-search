import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { API_CONSTANTS } from '../constants/api';
import { HOST } from '../environments/environments';


describe('ApiService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ApiService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.get(ApiService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call GET method', () => {
    service.get(`${HOST}${API_CONSTANTS.FETCH_BANKS_BY_CITY}CHENNAI`).subscribe(res => {
      expect(res).toEqual({
        message: 'success'
      });
    });
    const req = httpTestingController.expectOne(
      `${HOST}${API_CONSTANTS.FETCH_BANKS_BY_CITY}CHENNAI`
    );
    expect(req.request.method).toEqual('GET');
    req.flush({
      message: 'success'
    });
    httpTestingController.verify();
  });
});
