import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosactivosPage } from './pedidosactivos.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosactivosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosactivosPageRoutingModule {}
