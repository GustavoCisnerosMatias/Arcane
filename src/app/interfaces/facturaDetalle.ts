export interface IFacturaDetalle {
  id: number;
  id_factura: number;
  id_producto: number;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
  estado: string;
}
