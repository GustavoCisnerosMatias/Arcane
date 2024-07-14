import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacturadetallesPageRoutingModule } from './facturadetalles-routing.module';

import { FacturadetallesPage } from './facturadetalles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacturadetallesPageRoutingModule
  ],
  declarations: [FacturadetallesPage]
})
export class FacturadetallesPageModule {}
