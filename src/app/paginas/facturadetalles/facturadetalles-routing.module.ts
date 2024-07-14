import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacturadetallesPage } from './facturadetalles.page';

const routes: Routes = [
  {
    path: '',
    component: FacturadetallesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacturadetallesPageRoutingModule {}
