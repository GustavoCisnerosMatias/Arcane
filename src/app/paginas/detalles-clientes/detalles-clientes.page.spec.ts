import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallesClientesPage } from './detalles-clientes.page';

describe('DetallesClientesPage', () => {
  let component: DetallesClientesPage;
  let fixture: ComponentFixture<DetallesClientesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesClientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
