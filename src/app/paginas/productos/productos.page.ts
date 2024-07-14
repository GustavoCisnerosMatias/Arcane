import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { IProducto } from 'src/app/interfaces/productos';
import { GeneralService } from 'src/app/services/general.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  listaProductos: IProducto[] = [];
  productosFiltrados: IProducto[] = [];
  filtroNombre: string = '';

  constructor(
    public servG: GeneralService,
    private servP: ProductosService,
    private loading: LoadingController
  ) {}

  ngOnInit() {
    this.cargarProductos();
  }

  ionViewWillEnter() {
    this.cargarProductos();
  }

  async cargarProductos() {
    let l = await this.loading.create();
    l.present();
    this.servP.getProductos().subscribe(
      (respuesta: any) => {
        this.listaProductos = respuesta.data;
        this.productosFiltrados = this.listaProductos;
        l.dismiss();
      },
      (error: any) => {
        l.dismiss();
        this.servG.fun_Mensaje('Error al cargar los productos: ' + error);
      }
    );
  }

  filtrarProductos() {
    this.productosFiltrados = this.listaProductos.filter((producto) =>
      producto.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
    );
  }

  funEditar(item: IProducto) {
    this.servG.irA('/producto/' + item.id);
  }

  funEliminar(item: IProducto) {
    this.servP.deleteProducto(item.id).subscribe(
      (respuesta: any) => {
        this.cargarProductos();
        this.servG.fun_Mensaje('Producto eliminado');
      },
      (error: any) => {
        this.servG.fun_Mensaje('Error al eliminar el producto: ' + error);
      }
    );
  }
}
