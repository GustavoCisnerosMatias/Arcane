import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { IFactura } from 'src/app/interfaces/factura';
import { IMesa } from 'src/app/interfaces/mesas';
import { FacturasService } from 'src/app/services/facturas.service';
import { GeneralService } from 'src/app/services/general.service';
import { MesasService } from 'src/app/services/mesas.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.page.html',
  styleUrls: ['./factura.page.scss'],
})
export class FacturaPage implements OnInit {
  objFactura: IFactura = {
    id: 0,
    fecha: '',
    nombreCliente: '',
    id_mesa: 0,
    total: 0,
    estado: '1',
  };
  mesas: IMesa[] = [];
  id: number = 0;

  constructor(
    private servF: FacturasService,
    public servG: GeneralService,
    private loading: LoadingController,
    private router: ActivatedRoute,
    private mesasService: MesasService
  ) {
    this.id = this.router.snapshot.params['id']
      ? this.router.snapshot.params['id']
      : 0;
  }

  async ngOnInit() {
    let l = await this.loading.create();
    l.present();
    this.cargarMesas();
    if (this.id > 0) {
      this.funBuscarFactura();
    }
    l.dismiss();
  }

  async ionViewWillEnter() {
    let l = await this.loading.create();
    l.present();
    if (this.id > 0) {
      await this.funBuscarFactura();
    }
    l.dismiss();
  }

  async cargarMesas() {
    const loading = await this.loading.create();
    await loading.present();

    this.mesasService.getMesas().subscribe(
      (respuesta: any) => {
        this.mesas = respuesta.data;
        loading.dismiss();
      },
      (error: any) => {
        loading.dismiss();
        this.servG.fun_Mensaje('Error al cargar las mesas: ' + error);
      }
    );
  }

  async funBuscarFactura() {
    this.servF.getFacturaByID(this.id).subscribe((respuesta: any) => {
      this.objFactura = respuesta.data[0];
    });
  }

  async guardarCambios() {
    let l = await this.loading.create();
    l.present();

    this.objFactura.fecha = new Date().toISOString();

    console.log(this.objFactura);
    this.servF.setFactura(this.objFactura).subscribe(
      (respuesta: any) => {
        console.log(respuesta);
        l.dismiss();
        this.servG.fun_Mensaje('Factura guardada');
      },
      (error: any) => {
        this.servG.fun_Mensaje('Error : ' + error);
        l.dismiss();
      }
    );
    this.backToFacturas();
  }

  backToFacturas() {
    if (this.servF.historial === 1) {
      this.servG.irA('historialfacturas');
    } else {
      this.servG.irA('facturas');
    }
  }
}
