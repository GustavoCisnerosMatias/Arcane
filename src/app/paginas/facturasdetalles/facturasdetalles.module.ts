import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacturasdetallesPageRoutingModule } from './facturasdetalles-routing.module';

import { FacturasdetallesPage } from './facturasdetalles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacturasdetallesPageRoutingModule
  ],
  declarations: [FacturasdetallesPage]
})
export class FacturasdetallesPageModule {}
