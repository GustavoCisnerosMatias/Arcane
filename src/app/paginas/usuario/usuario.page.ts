import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { IUsuario } from 'src/app/interfaces/usuario';
import { GeneralService } from 'src/app/services/general.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  objUsuario: IUsuario = {
    id: 0,
    nombre: '',
    usuario: '',
    contrasena: '',
    es_admin: '2',
  };
  id: number = 0;

  constructor(
    private servU: UsuariosService,
    public servG: GeneralService,
    private loading: LoadingController,
    private router: ActivatedRoute
  ) {
    this.id = this.router.snapshot.params['id']
      ? this.router.snapshot.params['id']
      : 0;
    console.log(this.id);
  }

  async ngOnInit() {
    let l = await this.loading.create();
    l.present();
    if (this.id > 0) {
      this.funBuscarUsuario();
    }

    l.dismiss();
  }
  async ionViewWillEnter() {
    let l = await this.loading.create();
    l.present();
    if (this.id > 0) {
      await this.funBuscarUsuario();
    }

    l.dismiss();
    console.log(this.objUsuario);
  }

  async funBuscarUsuario() {
    this.servU.getUsuarioxID(this.id).subscribe((respuesta: any) => {
      this.objUsuario = respuesta.data[0];
    });
  }

  async guardarCambios() {
    console.log(this.objUsuario);
    let l = await this.loading.create();
    l.present();
    this.servU.setUsuario(this.objUsuario).subscribe(
      (respuesta: any) => {
        console.log(respuesta);
        l.dismiss();
        this.servG.fun_Mensaje('Usuario guardado');
      },
      (error: any) => {
        this.servG.fun_Mensaje('Error : ' + error);
        console.log(error);
        l.dismiss();
      }
    );
    this.backToUsuarios();
  }

  backToUsuarios() {
    this.servG.irA('usuarios');
  }
}
