import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { BankSearchPage } from './bank-search.page';
import { BankSearchService } from './services/bank-search.service';
import { of } from 'rxjs';
import { banksMock } from './services/bank-search.service.spec';

describe('BankSearchPage', () => {
  let component: BankSearchPage;
  let fixture: ComponentFixture<BankSearchPage>;
  let bankSearchService: BankSearchService;
  const bankSearchServiceMock: Partial<BankSearchService> = {
    banks: banksMock,
    fetchBanksByCity: () => of([...banksMock]),
    filterBanks: () => [...banksMock]
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankSearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: BankSearchService, useValue: bankSearchServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankSearchPage);
    bankSearchService = TestBed.get(BankSearchService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load next 10 banks based on scroll event', () => {
    const eventMock = {
      target: {
        complete: () => {}
      }
    };
    component.loadData(eventMock);
    component.banks = banksMock;
    component.searchedBanks = banksMock;
    expect(component.searchedBanks.length).toEqual(banksMock.length);
  });

  it('should fetch banks on selection of city and display list of banks', () => {
    component.city = 'BANGALORE';
    component.fetchBanksByCity();
    expect(component.searchedBanks.length).toEqual(banksMock.length);
  });

  it('should search for banks based on input text', () => {
    component.searchText = 'ADCB0000002';
    component.city = 'BANGALORE';
    component.filterBanks();
    expect(component.searchedBanks.length).toEqual(banksMock.length);
  });
});
