import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { IFacturaDetalle } from 'src/app/interfaces/facturaDetalle';
import { IProducto } from 'src/app/interfaces/productos';
import { FacturasDetalleService } from 'src/app/services/facturas-detalle.service';
import { FacturasService } from 'src/app/services/facturas.service';
import { GeneralService } from 'src/app/services/general.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-detalles-clientes',
  templateUrl: './detalles-clientes.page.html',
  styleUrls: ['./detalles-clientes.page.scss'],
})
export class DetallesClientesPage implements OnInit {
  detallesFactura: IFacturaDetalle[] = [];
  detallesFiltrados: IFacturaDetalle[] = [];
  productos: IProducto[] = [];
  filtroProducto: string = '';
  facturaID: number;
  total = 0;

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
  actualizarTotal() {
    let subtotal = 0;
    for (let item of this.detallesFactura) {
      subtotal += parseFloat(item.subtotal.toString());
    }
    this.total = subtotal;
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

    this.facturaDetalleService.getDetalleByFactura(this.facturaID).subscribe(
      (respuesta: any) => {
        this.detallesFactura = respuesta.data;
        this.detallesFiltrados = this.detallesFactura;
        this.actualizarTotal();
        this.actualizarFactura();
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

  async actualizarFactura() {
    console.log('hi');
    let l = await this.loadingCtrl.create();
    l.present();
    let total = 0;
    for (let item of this.detallesFactura) {
      total += parseFloat(item.subtotal.toString());
    }
    this.facturaService.updateTotal(this.facturaID, total).subscribe(
      (respuesta: any) => {
        l.dismiss();
        console.log(respuesta);

        this.servG.fun_Mensaje('Se actualizo la factura');
      },
      (error: any) => {
        l.dismiss();
        this.servG.fun_Mensaje('Error : ' + error, 'danger');
      }
    );
  }
  nuevodetalle() {
    this.servG.irA('/facturadetalles/' + 0 + '/' + this.facturaID);
  }
}
