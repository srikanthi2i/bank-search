import { Component, ViewChild } from '@angular/core';
import { IBank, BankSearchService } from 'src/app/pages/bank-search/services/bank-search.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IonInfiniteScroll } from '@ionic/angular';
import { APP_CONSTANTS } from 'src/app/constants';

@Component({
  selector: 'app-bank-search',
  templateUrl: './bank-search.page.html',
  styleUrls: ['./bank-search.page.scss'],
})
export class BankSearchPage {
  @ViewChild(IonInfiniteScroll, {
    static: true
  }) infiniteScroll: IonInfiniteScroll;
  banks: IBank[] = [];
  searchedBanks: IBank[] = [];
  city: string;
  searchText: string;
  loader: boolean;
  scrollSize: number;

  constructor(private bankSearchService: BankSearchService) {
    this.scrollSize = APP_CONSTANTS.SCROLL_LENGTH;
  }

  loadData(event: any): void {
    setTimeout(() => {
      for (let i = 0; i < this.scrollSize; i++) {
        const nextBank = this.banks[this.searchedBanks.length + i];
        if (nextBank) {
          this.searchedBanks.push(nextBank);
        }
      }
      event.target.complete();
    }, 700);
  }

  fetchBanksByCity(): void {
    this.loader = true;
    this.bankSearchService.fetchBanksByCity(this.city).subscribe((banks: IBank[]) => {
      this.banks = banks;
      this.searchedBanks = banks.slice(0, this.scrollSize);
      this.loader = false;
    }, (err: HttpErrorResponse) => {
      this.banks = [];
      this.loader = false;
    });
  }

  filterBanks(): void {
    if (this.city) {
      this.banks = this.bankSearchService.filterBanks(this.searchText.toLowerCase());
      this.searchedBanks = this.banks.slice(0, this.scrollSize);
    }
  }
}
