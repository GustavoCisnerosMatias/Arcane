import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { IFacturaDetalle } from 'src/app/interfaces/facturaDetalle';
import { IProducto } from 'src/app/interfaces/productos';
import { FacturasDetalleService } from 'src/app/services/facturas-detalle.service';
import { FacturasService } from 'src/app/services/facturas.service';
import { GeneralService } from 'src/app/services/general.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-pedidosactivos',
  templateUrl: './pedidosactivos.page.html',
  styleUrls: ['./pedidosactivos.page.scss'],
})
export class PedidosactivosPage implements OnInit {
  detallesFactura: IFacturaDetalle[] = [];
  detallesFiltrados: IFacturaDetalle[] = [];
  productos: IProducto[] = [];
  filtroProducto: string = '';
  facturaID: number;

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private facturaDetalleService: FacturasDetalleService,
    private facturaService: FacturasService,

    private productosService: ProductosService,
    public servG: GeneralService
  ) {
    this.facturaID = this.route.snapshot.params['id']
      ? this.route.snapshot.params['id']
      : 0;
  }

  ngOnInit() {
    this.cargarProductos();
    this.cargarDetalleFactura();
  }
  ionViewWillEnter() {
    this.cargarProductos();
    this.cargarDetalleFactura();
  }

  async cargarProductos() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    this.productosService.getProductos().subscribe(
      (respuesta: any) => {
        this.productos = respuesta.data;
        loading.dismiss();
      },
      (error: any) => {
        loading.dismiss();
        this.servG.fun_Mensaje('Error al cargar los productos: ' + error);
      }
    );
  }

  async cargarDetalleFactura() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    this.facturaDetalleService.getFacturaDetallesActivas().subscribe(
      (respuesta: any) => {
        this.detallesFactura = respuesta.data;
        this.detallesFiltrados = this.detallesFactura;
        loading.dismiss();
      },
      (error: any) => {
        loading.dismiss();
        this.servG.fun_Mensaje(
          'Error al cargar el detalle de la factura: ' + error
        );
      }
    );
  }

  getNombreProducto(id_producto: number): string {
    const producto = this.productos.find((p) => p.id === id_producto);
    return producto ? producto.nombre : 'Producto no encontrado';
  }

  filtrarDetalles() {
    this.detallesFiltrados = this.detallesFactura.filter((detalle) =>
      this.getNombreProducto(detalle.id_producto)
        .toLowerCase()
        .includes(this.filtroProducto.toLowerCase())
    );
  }

  editarDetalle(detalle: IFacturaDetalle, ionItemSliding: IonItemSliding) {
    ionItemSliding.close();
    detalle.estado = '0';
    this.update(detalle);
    this.cargarDetalleFactura();
  }
  actualizar() {
    this.ionViewWillEnter();
  }

  async update(detalle: IFacturaDetalle) {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    this.facturaDetalleService.setFacturaDetalle(detalle).subscribe(
      (respuesta: any) => {
        this.servG.fun_Mensaje(respuesta.Mensaje, respuesta.color);
        loading.dismiss();
      },
      (error: any) => {
        this.servG.fun_Mensaje(
          'Error al guardar el detalle: ' + error,
          'danger'
        );
        loading.dismiss();
      }
    );
  }
}
