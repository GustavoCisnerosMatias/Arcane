import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialfacturasPageRoutingModule } from './historialfacturas-routing.module';

import { HistorialfacturasPage } from './historialfacturas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialfacturasPageRoutingModule
  ],
  declarations: [HistorialfacturasPage]
})
export class HistorialfacturasPageModule {}
