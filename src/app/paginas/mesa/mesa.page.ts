import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { IMesa } from 'src/app/interfaces/mesas';
import { GeneralService } from 'src/app/services/general.service';
import { MesasService } from 'src/app/services/mesas.service';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.page.html',
  styleUrls: ['./mesa.page.scss'],
})
export class MesaPage implements OnInit {
  objMesa: IMesa = {
    id: 0,
    numero_mesa: 0,
    codigo_qr: '',
    estado: '',
  };
  id: number = 0;

  constructor(
    private servM: MesasService,
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
      this.funBuscarMesa();
    }
    l.dismiss();
  }

  async ionViewWillEnter() {
    let l = await this.loading.create();
    l.present();
    if (this.id > 0) {
      await this.funBuscarMesa();
    }
    l.dismiss();
  }

  async funBuscarMesa() {
    this.servM.getMesaxID(this.id).subscribe((respuesta: any) => {
      this.objMesa = respuesta.data[0];
    });
  }

  async guardarCambios() {
    let l = await this.loading.create();
    l.present();
    this.servM.setMesa(this.objMesa).subscribe(
      (respuesta: any) => {
        l.dismiss();
        this.servG.fun_Mensaje('Mesa guardada');
      },
      (error: any) => {
        this.servG.fun_Mensaje('Error : ' + error, 'danger');
        l.dismiss();
      }
    );
    this.backToMesas();
  }

  backToMesas() {
    this.servG.irA('mesas');
  }
}
