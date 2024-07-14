import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'usuario/:id',
    loadChildren: () =>
      import('./paginas/usuario/usuario.module').then(
        (m) => m.UsuarioPageModule
      ),
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./paginas/usuarios/usuarios.module').then(
        (m) => m.UsuariosPageModule
      ),
  },
  {
    path: 'producto/:id',
    loadChildren: () =>
      import('./paginas/producto/producto.module').then(
        (m) => m.ProductoPageModule
      ),
  },
  {
    path: 'productos',
    loadChildren: () =>
      import('./paginas/productos/productos.module').then(
        (m) => m.ProductosPageModule
      ),
  },
  {
    path: 'mesas',
    loadChildren: () =>
      import('./paginas/mesas/mesas.module').then((m) => m.MesasPageModule),
  },
  {
    path: 'mesa/:id',
    loadChildren: () =>
      import('./paginas/mesa/mesa.module').then((m) => m.MesaPageModule),
  },
  {
    path: 'facturas',
    loadChildren: () =>
      import('./paginas/facturas/facturas.module').then(
        (m) => m.FacturasPageModule
      ),
  },
  {
    path: 'factura/:id',
    loadChildren: () =>
      import('./paginas/factura/factura.module').then(
        (m) => m.FacturaPageModule
      ),
  },
  {
    path: 'historialfacturas',
    loadChildren: () =>
      import('./paginas/historialfacturas/historialfacturas.module').then(
        (m) => m.HistorialfacturasPageModule
      ),
  },
  {
    path: 'facturadetalles/:id/:idFactura',
    loadChildren: () =>
      import('./paginas/facturadetalles/facturadetalles.module').then(
        (m) => m.FacturadetallesPageModule
      ),
  },
  {
    path: 'facturasdetalles/:id',
    loadChildren: () =>
      import('./paginas/facturasdetalles/facturasdetalles.module').then(
        (m) => m.FacturasdetallesPageModule
      ),
  },
  {
    path: 'pedidosactivos',
    loadChildren: () =>
      import('./paginas/pedidosactivos/pedidosactivos.module').then(
        (m) => m.PedidosactivosPageModule
      ),
  },
  {
    path: 'detalles-clientes/:id',
    loadChildren: () =>
      import('./paginas/detalles-clientes/detalles-clientes.module').then(
        (m) => m.DetallesClientesPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
