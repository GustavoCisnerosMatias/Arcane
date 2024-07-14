import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesClientesPage } from './detalles-clientes.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesClientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesClientesPageRoutingModule {}
