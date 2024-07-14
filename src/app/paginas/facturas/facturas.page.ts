import { Component, OnInit } from '@angular/core';
import {
  IonItemSliding,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { IFactura } from 'src/app/interfaces/factura';
import { FacturasService } from 'src/app/services/facturas.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.page.html',
  styleUrls: ['./facturas.page.scss'],
})
export class FacturasPage implements OnInit {
  facturas: IFactura[] = [];

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    public servG: GeneralService,
    private facturasService: FacturasService
  ) {}

  ngOnInit() {
    this.cargarFacturas();
  }
  ionViewWillEnter() {
    this.cargarFacturas();
    this.facturasService.historial = 0;
  }

  async cargarFacturas() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    this.facturasService.getFacturasActivas().subscribe(
      (respuesta: any) => {
        console.log(respuesta);
        this.facturas = respuesta.data;
        loading.dismiss();
      },
      (error: any) => {
        loading.dismiss();
        this.servG.fun_Mensaje('Error al cargar las facturas: ' + error);
      }
    );
  }

  irANuevaFactura() {
    this.navCtrl.navigateForward('/nueva-factura');
  }
  editarFactura(factura: IFactura, slidingItem: IonItemSliding) {
    slidingItem.close();

    this.servG.irA('/factura/' + factura.id);
  }

  verDetalles(factura: IFactura, slidingItem: IonItemSliding) {
    slidingItem.close();

    this.servG.irA('/facturasdetalles/' + factura.id);
  }

  eliminarFactura(factura: IFactura, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.facturasService.deleteFactura(factura.id).subscribe(
      (respuesta: any) => {
        this.cargarFacturas();
        console.log(respuesta);
        this.servG.fun_Mensaje('Factura eliminada');
      },
      (error: any) => {
        this.servG.fun_Mensaje('Error al eliminar la mesa: ' + error);
      }
    );
  }
}
