import { Component, OnInit } from '@angular/core';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { IMesa } from 'src/app/interfaces/mesas';
import { GeneralService } from 'src/app/services/general.service';
import { MesasService } from 'src/app/services/mesas.service';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.page.html',
  styleUrls: ['./mesas.page.scss'],
})
export class MesasPage implements OnInit {
  listaMesas: IMesa[] = [];
  mesasFiltradas: IMesa[] = [];
  filtroNumeroMesa: string = '';

  constructor(
    public servG: GeneralService,
    private servM: MesasService,
    private loading: LoadingController
  ) {}

  ngOnInit() {
    this.cargarMesas();
  }

  ionViewWillEnter() {
    this.cargarMesas();
  }

  async cargarMesas() {
    let l = await this.loading.create();
    l.present();
    this.servM.getMesas().subscribe(
      (respuesta: any) => {
        this.listaMesas = respuesta.data;
        this.mesasFiltradas = this.listaMesas;
        l.dismiss();
      },
      (error: any) => {
        l.dismiss();
        this.servG.fun_Mensaje('Error al cargar los datos: ' + error);
      }
    );
  }

  filtrarMesas() {
    this.mesasFiltradas = this.listaMesas.filter((mesa) =>
      mesa.numero_mesa.toString().includes(this.filtroNumeroMesa)
    );
  }

  funEditar(item: IMesa, ionItemSliding: IonItemSliding) {
    ionItemSliding.close();
    this.servG.irA('/mesa/' + item.id);
  }

  funEliminar(item: IMesa, ionItemSliding: IonItemSliding) {
    ionItemSliding.close();
    this.servM.deleteMesa(item.id).subscribe(
      (respuesta: any) => {
        this.cargarMesas();
        this.servG.fun_Mensaje('Mesa eliminada');
      },
      (error: any) => {
        this.servG.fun_Mensaje('Error al eliminar la mesa: ' + error);
      }
    );
  }
}
