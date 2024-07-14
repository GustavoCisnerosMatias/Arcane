import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { IFacturaDetalle } from 'src/app/interfaces/facturaDetalle';
import { IProducto } from 'src/app/interfaces/productos';
import { FacturasDetalleService } from 'src/app/services/facturas-detalle.service';
import { GeneralService } from 'src/app/services/general.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-facturadetalles',
  templateUrl: './facturadetalles.page.html',
  styleUrls: ['./facturadetalles.page.scss'],
})
export class FacturadetallesPage implements OnInit {
  detalle: IFacturaDetalle = {
    id: 0,
    id_factura: 0,
    id_producto: 0,
    cantidad: 1,
    precio_unitario: 0,
    subtotal: 0,
    estado: '1',
  };
  productos: IProducto[] = [];
  id: number = 0;
  idFactura: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loadingCtrl: LoadingController,
    private facturaDetalleService: FacturasDetalleService,
    private productosService: ProductosService,
    public servG: GeneralService
  ) {
    this.id = this.route.snapshot.params['id']
      ? this.route.snapshot.params['id']
      : 0;
    this.idFactura = this.route.snapshot.params['idFactura']
      ? this.route.snapshot.params['idFactura']
      : 0;
  }

  ngOnInit() {
    this.cargarProductos();
    if (this.id > 0) {
      this.cargarDetalle();
    }
    if (this.idFactura > 0) {
      this.detalle.id_factura = this.idFactura;
    }
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

  async cargarDetalle() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    this.facturaDetalleService.getFacturaDetalleByID(this.id).subscribe(
      (respuesta: any) => {
        this.detalle = respuesta.data[0];
        loading.dismiss();
      },
      (error: any) => {
        loading.dismiss();
        this.servG.fun_Mensaje('Error al cargar el detalle: ' + error);
      }
    );
  }

  actualizarPrecioUnitario() {
    const productoSeleccionado = this.productos.find(
      (producto) => producto.id === this.detalle.id_producto
    );
    if (productoSeleccionado) {
      this.detalle.precio_unitario = productoSeleccionado.precio;
      this.calcularSubtotal();
    }
  }

  calcularSubtotal() {
    this.detalle.subtotal =
      this.detalle.cantidad * this.detalle.precio_unitario;
  }

  async guardarDetalle() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    this.calcularSubtotal();

    this.facturaDetalleService.setFacturaDetalle(this.detalle).subscribe(
      (respuesta: any) => {
        this.servG.fun_Mensaje('Detalle guardado correctamente');
        loading.dismiss();
        if (this.servG.client === 1) {
          this.servG.irA('detalles-clientes/' + this.detalle.id_factura);
        } else {
          this.servG.irA('facturasdetalles/' + this.detalle.id_factura);
        }
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

  cancelar() {
    if (this.servG.client === 1) {
      this.servG.irA('detalles-clientes/' + this.detalle.id_factura);
    } else {
      this.servG.irA('facturasdetalles/' + this.detalle.id_factura);
    }
  }
}
