import { TestBed } from '@angular/core/testing';

import { FacturasDetalleService } from './facturas-detalle.service';

describe('FacturasDetalleService', () => {
  let service: FacturasDetalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturasDetalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
