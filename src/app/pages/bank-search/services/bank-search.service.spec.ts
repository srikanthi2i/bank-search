import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { BankSearchService, IBank, Bank } from './bank-search.service';
import { API_CONSTANTS } from 'src/app/constants/api';
import { HOST } from 'src/app/environments/environments';

export const banksMock: IBank[] = [new Bank({
  ifsc: 'ADCB0000002',
  bank_id: 143,
  branch: 'BANGALORE',
  address: 'CITI CENTRE, 28, CHURCH STREET, OFF M. G. ROAD BANGALORE 560001',
  city: 'BANGALORE',
  district: 'BANGALORE URBAN',
  state: 'KARNATAKA',
  bank_name: 'ABU DHABI COMMERCIAL BANK'
})];

describe('BankSearchService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: BankSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [BankSearchService]
    });
    service = TestBed.get(BankSearchService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch list of banks by city', () => {
    service.get(`${HOST}${API_CONSTANTS.FETCH_BANKS_BY_CITY}BANGALORE`).subscribe((banks: IBank[]) => {
      expect(banks.length).toEqual(banksMock.length);
    });
    const req = httpTestingController.expectOne(
      `${HOST}${API_CONSTANTS.FETCH_BANKS_BY_CITY}BANGALORE`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(banksMock);
    httpTestingController.verify();
  });

  it('should fetch list of banks by city', () => {
    service.banks = banksMock;
    const filteredBanks = service.filterBanks('adcb'.toLowerCase());
    expect(filteredBanks.length).toEqual(banksMock.length);
  });
});
