import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FacturasdetallesPage } from './facturasdetalles.page';

describe('FacturasdetallesPage', () => {
  let component: FacturasdetallesPage;
  let fixture: ComponentFixture<FacturasdetallesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturasdetallesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
