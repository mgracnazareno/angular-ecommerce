import { TestBed } from '@angular/core/testing';

import { BotanicalShopFormService } from './botanical-shop-form.service';

describe('BotanicalShopFormService', () => {
  let service: BotanicalShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BotanicalShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
