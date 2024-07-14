import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FacturadetallesPage } from './facturadetalles.page';

describe('FacturadetallesPage', () => {
  let component: FacturadetallesPage;
  let fixture: ComponentFixture<FacturadetallesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturadetallesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
