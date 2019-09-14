import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/providers/api.service';
import { API_CONSTANTS } from 'src/app/constants/api';

export interface IBank {
  bank_name: string;
  branch: string;
  ifsc: string;
  bank_id: number;
  address: string;
  city: string;
  district: string;
  state: string;
}

export class Bank implements IBank {
  bank_name: string;
  branch: string;
  ifsc: string;
  bank_id: number;
  address: string;
  city: string;
  district: string;
  state: string;

  constructor(values: IBank) {
    Object.assign(this, values);
  }
}

@Injectable()
export class BankSearchService extends ApiService {

  public banks: IBank[];

  fetchBanksByCity(city: string): Observable<Bank[]> {
    return this.get(`${API_CONSTANTS.FETCH_BANKS_BY_CITY}${city}`).pipe(
      map((banks: IBank[]) => {
        this.banks = banks.map(bank => new Bank(bank));
        return this.banks;
      })
    );
  }

  filterBanks(searchText: string): IBank[] {
    return this.banks.filter((bank) => {
      return JSON.stringify(bank).toLowerCase().indexOf(searchText) !== -1 && bank;
    });
  }
}
