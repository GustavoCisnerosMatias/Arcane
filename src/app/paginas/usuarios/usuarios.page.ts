import { Component, OnInit } from '@angular/core';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { IUsuario } from 'src/app/interfaces/usuario';
import { GeneralService } from 'src/app/services/general.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  listaUsuarios: IUsuario[] = [];
  usuariosFiltrados: IUsuario[] = [];
  filtroNombre: string = '';

  constructor(
    public servG: GeneralService,
    private servU: UsuariosService,
    private loading: LoadingController
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  ionViewWillEnter() {
    this.cargarUsuarios();
  }

  async cargarUsuarios() {
    let l = await this.loading.create();
    l.present();
    this.servU.getUsuarios().subscribe(
      (respuesta: any) => {
        this.listaUsuarios = respuesta.data;
        this.usuariosFiltrados = this.listaUsuarios;
        l.dismiss();
      },
      (error: any) => {
        l.dismiss();
        this.servG.fun_Mensaje('Error al cargar los datos : ' + error);
      }
    );
  }

  filtrarUsuarios() {
    this.usuariosFiltrados = this.listaUsuarios.filter((usuario) =>
      usuario.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
    );
  }

  funEditar(item: IUsuario, ionItemSliding: IonItemSliding) {
    ionItemSliding.close();
    this.servG.irA('/usuario/' + item.id);
  }

  funEliminar(item: IUsuario, ionItemSliding: IonItemSliding) {
    ionItemSliding.close();
    this.servU.deleteUsuario(item.id).subscribe(
      (respuesta: any) => {
        this.cargarUsuarios();
        this.servG.fun_Mensaje('Usuario eliminado');
      },
      (error: any) => {
        console.log(error);
        this.servG.fun_Mensaje(
          'Error al eliminar el usuario: ' + JSON.stringify(error)
        );
      }
    );
  }
}
