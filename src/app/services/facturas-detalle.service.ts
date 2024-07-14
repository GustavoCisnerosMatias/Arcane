import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { IFacturaDetalle } from '../interfaces/facturaDetalle';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root',
})
export class FacturasDetalleService {
  constructor(private http: HttpClient, private servg: GeneralService) {}

  getFacturaDetalles() {
    const url = this.servg.URLAPI + 'listarFacturaDetalles';
    return this.http.get(url);
  }
  getFacturaDetallesActivas() {
    const url = this.servg.URLAPI + 'listarFacturaDetallesActivas';
    return this.http.get(url);
  }

  getFacturaDetalleByID(id: number) {
    const url = this.servg.URLAPI + 'getFacturaDetalleID';
    const data = this.servg.objectToFormData({
      FacturaDetalleID: id,
    });
    return this.http.post(url, data);
  }
  getDetalleByFactura(id: number) {
    const url = this.servg.URLAPI + 'getDetalleFacturaID';
    const data = this.servg.objectToFormData({
      facturaID: id,
    });
    return this.http.post(url, data);
  }

  setFacturaDetalle(objFacturaDetalle: IFacturaDetalle) {
    let url = '';
    if (objFacturaDetalle.id > 0) {
      url = this.servg.URLAPI + 'updateFacturaDetalle';
    } else {
      url = this.servg.URLAPI + 'insertFacturaDetalle';
    }
    const data = this.servg.objectToFormData({
      FacturaDetalleID: objFacturaDetalle.id,
      IdFactura: objFacturaDetalle.id_factura,
      IdProducto: objFacturaDetalle.id_producto,
      Cantidad: objFacturaDetalle.cantidad,
      PrecioUnitario: objFacturaDetalle.precio_unitario,
      Subtotal: objFacturaDetalle.subtotal,
      Estado: objFacturaDetalle.estado,
    });
    return this.http.post(url, data).pipe(
      catchError((error: any) => {
        console.error('Ocurrió un error al insertar o actualizar:', error);
        return throwError(error);
      })
    );
  }

  deleteFacturaDetalle(id: number) {
    const url = this.servg.URLAPI + 'eliminarFacturaDetalle';
    const data = this.servg.objectToFormData({
      FacturaDetalleID: id,
    });
    return this.http.post(url, data).pipe(
      catchError((error: any) => {
        console.log(error);
        this.servg.fun_Mensaje('Ocurrió un error al eliminar', 'danger');
        return throwError(error);
      })
    );
  }
}
