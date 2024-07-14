import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController, LoadingController } from '@ionic/angular';
import { IUsuario } from '../interfaces/usuario';
import { FacturasService } from '../services/facturas.service';
import { GeneralService } from '../services/general.service';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  showDiv: boolean = false;
  listaUsuarios: IUsuario[] = [];
  user = '';
  pass = '';
  admin = 3;
  isSupported = false;
  codigoqr = '';
  nombreCliente = '';
  constructor(
    public servG: GeneralService,
    private servU: UsuariosService,
    private servF: FacturasService,
    private alertController: AlertController,
    private loading: LoadingController
  ) {}

  ionViewWillEnter() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }
  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const result = await BarcodeScanner.scan();
    if (result.barcodes.length > 0) {
      this.codigoqr = result.barcodes[0].displayValue;
    }
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }
  async toggleDiv() {
    this.showDiv = !this.showDiv;
  }
  async ConsultarCuenta() {
    let l = await this.loading.create();
    l.present();
    this.servF.qr(this.codigoqr, this.nombreCliente).subscribe(
      (respuesta: any) => {
        console.log(respuesta);
        if (respuesta.data.length > 0) {
          this.servG.irA('detalles-clientes/' + respuesta.data[0].id);
        }
        this.servG.fun_Mensaje(
          JSON.stringify(respuesta.Mensaje),
          respuesta.color
        );
      },
      (error: any) => {
        l.dismiss();
        this.servG.fun_Mensaje(
          'Error al cargar los datos : ' + error,
          'danger'
        );
      }
    );
    l.dismiss();
  }

  async cargarUsuarios() {
    let l = await this.loading.create();
    l.present();
    this.servU.login(this.user, this.pass).subscribe(
      (respuesta: any) => {
        if (respuesta.data.length > 0) {
          this.admin = respuesta.data[0].es_admin;
        } else {
          this.admin = 3;
        }
        this.servG.client = 0;
        this.listaUsuarios = respuesta.data;
        this.servG.fun_Mensaje(respuesta.Mensaje, respuesta.color);
        l.dismiss();
      },
      (error: any) => {
        l.dismiss();

        this.servG.fun_Mensaje('Error al cargar los datos : ' + error);
      }
    );
    console.log('admin' + this.admin);
    l.dismiss();
  }
  cerrarSesion() {
    console.log(this.admin);
    this.admin = 3;
    this.user = ''; // Limpia el usuario y contraseña
    this.pass = '';
    this.listaUsuarios = []; // Limpia la lista de usuarios cargados
    this.servG.client = 1;
  }
  limpiarScan() {
    this.codigoqr = '';
  }
}
