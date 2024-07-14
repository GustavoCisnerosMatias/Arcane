import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacturasdetallesPage } from './facturasdetalles.page';

const routes: Routes = [
  {
    path: '',
    component: FacturasdetallesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacturasdetallesPageRoutingModule {}
