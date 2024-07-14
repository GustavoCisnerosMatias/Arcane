import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { IProducto } from '../interfaces/productos';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  constructor(private http: HttpClient, private servg: GeneralService) {}

  getProductos() {
    const url = this.servg.URLAPI + 'listarProductos';
    return this.http.get(url);
  }

  getProductoxID(id: number) {
    const url = this.servg.URLAPI + 'getProductoID';
    const data = this.servg.objectToFormData({
      ProductoID: id,
    });
    return this.http.post(url, data);
  }

  setProducto(objProducto: IProducto) {
    let url = '';
    if (objProducto.id > 0) {
      url = this.servg.URLAPI + 'updateProducto';
    } else {
      url = this.servg.URLAPI + 'insertProducto';
    }
    const data = this.servg.objectToFormData({
      ProductoID: objProducto.id,
      Nombre: objProducto.nombre,
      Descripcion: objProducto.descripcion,
      Precio: objProducto.precio,
      Img: objProducto.img,
    });
    return this.http.post(url, data).pipe(
      catchError((error: any) => {
        console.error('Ocurrió un error al insertar o actualizar:', error);
        return throwError(error);
      })
    );
  }

  deleteProducto(id: number) {
    const url = this.servg.URLAPI + 'eliminarProducto';
    const data = this.servg.objectToFormData({
      ProductoID: id,
    });
    return this.http.post(url, data).pipe(
      catchError((error: any) => {
        this.servg.fun_Mensaje('Ocurrió un error al eliminar', 'danger');
        return throwError(error);
      })
    );
  }
}
