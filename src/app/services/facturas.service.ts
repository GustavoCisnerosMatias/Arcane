import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { IFactura } from '../interfaces/factura';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root',
})
export class FacturasService {
  public historial: number = 1;
  constructor(private http: HttpClient, private servg: GeneralService) {}

  getFacturas() {
    const url = this.servg.URLAPI + 'listarFacturas';
    return this.http.get(url);
  }
  getFacturasActivas() {
    const url = this.servg.URLAPI + 'FacturasActivas';
    return this.http.get(url);
  }

  getFacturaByID(id: number) {
    const url = this.servg.URLAPI + 'getFacturaID';
    const data = this.servg.objectToFormData({
      FacturaID: id,
    });
    return this.http.post(url, data);
  }
  qr(qr: string, nombre: string) {
    const url = this.servg.URLAPI + 'qr';
    const data = this.servg.objectToFormData({
      Qr: qr,
      NombreCliente: nombre,
    });
    return this.http.post(url, data);
  }

  updateTotal(id: number, total: number) {
    const url = this.servg.URLAPI + 'updateTotal';
    const data = this.servg.objectToFormData({
      FacturaID: id,
      Total: total,
    });
    return this.http.post(url, data);
  }

  setFactura(objFactura: IFactura) {
    console.log(objFactura);

    let url = '';
    if (objFactura.id > 0) {
      url = this.servg.URLAPI + 'updateFactura';
    } else {
      url = this.servg.URLAPI + 'insertFactura';
    }
    const data = this.servg.objectToFormData({
      FacturaID: objFactura.id,
      Fecha: objFactura.fecha,
      NombreCliente: objFactura.nombreCliente,
      IdMesa: objFactura.id_mesa,
      Total: objFactura.total,
      Estado: objFactura.estado,
    });
    return this.http.post(url, data).pipe(
      catchError((error: any) => {
        console.error('Ocurrió un error al insertar o actualizar:', error);
        return throwError(error);
      })
    );
  }

  deleteFactura(id: number) {
    const url = this.servg.URLAPI + 'eliminarFactura';
    const data = this.servg.objectToFormData({
      FacturaID: id,
    });
    return this.http.post(url, data).pipe(
      catchError((error: any) => {
        this.servg.fun_Mensaje('Ocurrió un error al eliminar', 'danger');
        return throwError(error);
      })
    );
  }
}
