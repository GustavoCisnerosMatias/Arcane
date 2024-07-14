import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialfacturasPage } from './historialfacturas.page';

describe('HistorialfacturasPage', () => {
  let component: HistorialfacturasPage;
  let fixture: ComponentFixture<HistorialfacturasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialfacturasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
