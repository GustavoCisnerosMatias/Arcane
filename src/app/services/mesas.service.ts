import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { IMesa } from '../interfaces/mesas';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root',
})
export class MesasService {
  constructor(private http: HttpClient, private servg: GeneralService) {}

  getMesas() {
    const url = this.servg.URLAPI + 'listarMesas';
    return this.http.get(url);
  }

  getMesaxID(id: number) {
    const url = this.servg.URLAPI + 'getMesaID';
    const data = this.servg.objectToFormData({
      MesaID: id,
    });
    return this.http.post(url, data);
  }

  setMesa(objMesa: IMesa) {
    let url = '';
    if (objMesa.id > 0) {
      url = this.servg.URLAPI + 'updateMesa';
    } else {
      url = this.servg.URLAPI + 'insertMesa';
    }
    const data = this.servg.objectToFormData({
      MesaID: objMesa.id,
      NumeroMesa: objMesa.numero_mesa,
      CodigoQR: objMesa.codigo_qr,
      Estado: objMesa.estado,
    });
    return this.http.post(url, data).pipe(
      catchError((error: any) => {
        console.error('Ocurrió un error al insertar o actualizar:', error);
        return throwError(error);
      })
    );
  }

  deleteMesa(id: number) {
    const url = this.servg.URLAPI + 'eliminarMesa';
    const data = this.servg.objectToFormData({
      MesaID: id,
    });
    return this.http.post(url, data).pipe(
      catchError((error: any) => {
        this.servg.fun_Mensaje('Ocurrió un error al eliminar', 'danger');
        return throwError(error);
      })
    );
  }
}
