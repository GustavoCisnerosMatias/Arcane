import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { IProducto } from 'src/app/interfaces/productos';
import { GeneralService } from 'src/app/services/general.service';
import { ProductosService } from 'src/app/services/productos.service';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  objProducto: IProducto = {
    id: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    img: '',
  };
  id: number = 0;

  constructor(
    private servP: ProductosService,
    public servG: GeneralService,
    private loading: LoadingController,
    private router: ActivatedRoute
  ) {
    this.id = this.router.snapshot.params['id']
      ? this.router.snapshot.params['id']
      : 0;
  }

  async ngOnInit() {
    let l = await this.loading.create();
    l.present();

    if (this.id > 0) {
      await this.funBuscarProducto();
    }

    l.dismiss();
  }

  async ionViewWillEnter() {
    let l = await this.loading.create();
    l.present();

    if (this.id > 0) {
      await this.funBuscarProducto();
    }

    l.dismiss();
  }

  async funBuscarProducto() {
    this.servP.getProductoxID(this.id).subscribe((respuesta: any) => {
      this.objProducto = respuesta.data[0];
    });
  }

  async guardarCambios() {
    let l = await this.loading.create();
    l.present();

    this.servP.setProducto(this.objProducto).subscribe(
      (respuesta: any) => {
        l.dismiss();
        this.servG.fun_Mensaje('Producto guardado');
      },
      (error: any) => {
        l.dismiss();
        this.servG.fun_Mensaje('Error al guardar el producto: ' + error);
      }
    );

    this.backToProductos();
  }

  backToProductos() {
    this.servG.irA('/productos');
  }
}
