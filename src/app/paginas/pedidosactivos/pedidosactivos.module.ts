import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosactivosPageRoutingModule } from './pedidosactivos-routing.module';

import { PedidosactivosPage } from './pedidosactivos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosactivosPageRoutingModule
  ],
  declarations: [PedidosactivosPage]
})
export class PedidosactivosPageModule {}
