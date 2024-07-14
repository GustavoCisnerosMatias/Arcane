import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialfacturasPage } from './historialfacturas.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialfacturasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialfacturasPageRoutingModule {}
