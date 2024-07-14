import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { QrCodeModule } from 'ng-qrcode';

import { MesaPageRoutingModule } from './mesa-routing.module';

import { MesaPage } from './mesa.page';

@NgModule({
  imports: [
    QrCodeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    MesaPageRoutingModule,
  ],
  declarations: [MesaPage],
})
export class MesaPageModule {}
