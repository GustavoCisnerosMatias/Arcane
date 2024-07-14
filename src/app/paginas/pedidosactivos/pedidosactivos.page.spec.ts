import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidosactivosPage } from './pedidosactivos.page';

describe('PedidosactivosPage', () => {
  let component: PedidosactivosPage;
  let fixture: ComponentFixture<PedidosactivosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosactivosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
