<?php
class factura_detalle_ctrl {
    public function listarFacturaDetalles($f3) {
        $cadenaSql = "SELECT * FROM factura_detalle";
        $items = $f3->DB->exec($cadenaSql);
        echo json_encode([
            'Mensaje' => count($items) > 0 ? 'Operación Exitosa' : 'No hay registros para la consulta',
            'cantidad' => count($items),
            'data' => $items,
            'color' => count($items) > 0 ? 'success' : 'danger'
        ]);
    }
    public function listarFacturaDetallesActivas($f3) {
        $cadenaSql = " SELECT * FROM `factura_detalle` WHERE estado = 1; ";
        $items = $f3->DB->exec($cadenaSql);
        echo json_encode([
            'Mensaje' => count($items) > 0 ? 'Operación Exitosa' : 'No hay registros para la consulta',
            'cantidad' => count($items),
            'data' => $items,
            'color' => count($items) > 0 ? 'success' : 'danger'
        ]);
    }
    public function getFacturaDetalleID($f3) {
        $factura_detalle_id = $f3->get('POST.FacturaDetalleID');
        if (empty($factura_detalle_id)) {
            echo json_encode([
                'Mensaje' => 'Error: El FacturaDetalleID es requerido',
                'cantidad' => 0,
                'data' => [],
                'color'=>'danger'
            ]);
            exit;
        }
        $cadenaSql = "SELECT * FROM factura_detalle WHERE id = " . $factura_detalle_id . ";";
        $items = $f3->DB->exec($cadenaSql);
        echo json_encode([
            'Mensaje' => count($items) > 0 ? 'Se encontró el detalle de la factura' : 'No se encontró el detalle de la factura',
            'cantidad' => count($items),
            'data' => $items,
            'color' => count($items) > 0 ? 'success' : 'danger'
        ]);
    }
    public function getDetalleFacturaID($f3) {
        $facturaID = $f3->get('POST.facturaID');
        if (empty($facturaID)) {
            echo json_encode([
                'Mensaje' => 'Error: El FacturaID es requerido',
                'cantidad' => 0,
                'data' => [],
                'color'=>'danger'
            ]);
            exit;
        }
        $cadenaSql = "SELECT * FROM factura_detalle WHERE id_factura = " . $facturaID . ";";
        $items = $f3->DB->exec($cadenaSql);
        echo json_encode([
            'Mensaje' => count($items) > 0 ? 'Se encontró el detalle de la factura' : 'No se encontró el detalle de la factura',
            'cantidad' => count($items),
            'data' => $items,
            'color' => count($items) > 0 ? 'success' : 'danger'
        ]);
    }

    public function insertFacturaDetalle($f3) {
        $id_factura = $f3->get('POST.IdFactura');
        $id_producto = $f3->get('POST.IdProducto');
        $cantidad = $f3->get('POST.Cantidad');
        $precio_unitario = $f3->get('POST.PrecioUnitario');
        $subtotal = $f3->get('POST.Subtotal');
        $estado = $f3->get('POST.Estado');

        $cadenaSql = "INSERT INTO factura_detalle (id_factura, id_producto, cantidad, precio_unitario, subtotal, estado) VALUES ('" . $id_factura . "', '" . $id_producto . "', '" . $cantidad . "', '" . $precio_unitario . "', '" . $subtotal . "', '" . $estado . "')";
        $result = $f3->DB->exec($cadenaSql);

        if ($result !== false) {
            echo json_encode([
                'Mensaje' => 'Se guardó correctamente',
                'color'=>'success'
            ]);
        } else {
            echo json_encode(['Mensaje' => 'Error: No se insertó el detalle de la factura' ,'color'=>'danger']);
        }
    }

    public function updateFacturaDetalle($f3) {
        $facturaDetalleID = $f3->get('POST.FacturaDetalleID');
        $id_factura = $f3->get('POST.IdFactura');
        $id_producto = $f3->get('POST.IdProducto');
        $cantidad = $f3->get('POST.Cantidad');
        $precio_unitario = $f3->get('POST.PrecioUnitario');
        $subtotal = $f3->get('POST.Subtotal');
        $estado = $f3->get('POST.Estado');

        $cadenaSql = "UPDATE factura_detalle SET id_factura = '" . $id_factura . "', id_producto = '" . $id_producto . "', cantidad = '" . $cantidad . "', precio_unitario = '" . $precio_unitario . "', subtotal = '" . $subtotal . "', estado = '" . $estado . "' WHERE id = '" . $facturaDetalleID . "'";
        $result = $f3->DB->exec($cadenaSql);

        if ($result !== false) {
            echo json_encode([
                'Mensaje' => 'Se guardó correctamente',
                'color'=>'success'
            ]);
        } else {
            echo json_encode(['Mensaje' => 'Error: No se actualizó el detalle de la factura' ,'color'=>'danger']);
        }
    }

    public function eliminarFacturaDetalle($f3) {
        $facturaDetalleID = $f3->get('POST.FacturaDetalleID');
        if (empty($facturaDetalleID)) {
            echo json_encode([
                'Mensaje' => 'Error: El FacturaDetalleID es requerido',
                'cantidad' => 0,
                'data' => [],
                'color'=>'danger'
            ]);
            exit;
        }

        $cadenaSql = "DELETE FROM factura_detalle WHERE id = '" . $facturaDetalleID . "'";
        $result = $f3->DB->exec($cadenaSql);

        if ($result !== false) {
            echo json_encode([
                'Mensaje' => 'Se eliminó correctamente',
                'color'=>'success'
            ]);
        } else {
            echo json_encode(['Mensaje' => 'Error: No se eliminó el detalle de la factura' ,'color'=>'danger']);
        }
    }
}
?>
