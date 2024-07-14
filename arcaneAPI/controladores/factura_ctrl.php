<?php
class factura_ctrl {
    public function listarFacturas($f3) {
        $cadenaSql = "SELECT * FROM facturas";
        $items = $f3->DB->exec($cadenaSql);
        echo json_encode([
            'Mensaje' => count($items) > 0 ? 'Operación Exitosa' : 'No hay registros para la consulta',
            'cantidad' => count($items),
            'data' => $items,
            'color' => count($items) > 0 ? 'success' : 'danger'
        ]);
    }
    public function FacturasActivas($f3) {
        $cadenaSql = "SELECT * FROM facturas WHERE estado = '1'";
        $items = $f3->DB->exec($cadenaSql);
        echo json_encode([
            'Mensaje' => count($items) > 0 ? 'Operación Exitosa' : 'No hay registros para la consulta',
            'cantidad' => count($items),
            'data' => $items,
            'color' => count($items) > 0 ? 'success' : 'danger'
        ]);
    }
    public function getFacturaID($f3) {
        $factura_id = $f3->get('POST.FacturaID');
        if (empty($factura_id)) {
            echo json_encode([
                'Mensaje' => 'Error: El FacturaID es requerido',
                'cantidad' => 0,
                'data' => [],
                'color'=>'danger'
            ]);
            exit;
        }
        $cadenaSql = "SELECT * FROM facturas WHERE id = " . $factura_id . ";";
        $items = $f3->DB->exec($cadenaSql);
        echo json_encode([
            'Mensaje' => count($items) > 0 ? 'Se encontró la factura' : 'No se encontró la factura',
            'cantidad' => count($items),
            'data' => $items,
            'color' => count($items) > 0 ? 'success' : 'danger'
        ]);
    }

    public function insertFactura($f3) {
        $fecha = $f3->get('POST.Fecha');
        $nombreCliente = $f3->get('POST.NombreCliente');
        $id_mesa = $f3->get('POST.IdMesa');
        $total = $f3->get('POST.Total');
        $estado = $f3->get('POST.Estado');

        $cadenaSql = "INSERT INTO facturas (fecha, nombreCliente, id_mesa,  estado) VALUES ('" . $fecha . "', '" . $nombreCliente . "', '" . $id_mesa . "', " . $estado . ")";
        $result = $f3->DB->exec($cadenaSql);
        if ($result !== false) {
            echo json_encode([
                'Mensaje' => $cadenaSql,
                'color'=>'success'
            ]);
        } else {
            echo json_encode(['Mensaje' => 'Error: No se insertó la factura' ,'color'=>'danger']);
        }
    }
    public function updateTotal($f3) {
        $facturaID = $f3->get('POST.FacturaID');
        $total = $f3->get('POST.Total');


        $cadenaSql = "UPDATE facturas SET  total = '" . $total . "'  WHERE id = '" . $facturaID . "'";
        $result = $f3->DB->exec($cadenaSql);

        if ($result !== false) {
            echo json_encode([
                'Mensaje' => 'Se actualizo',
                'color'=>'success'
            ]);
        } else {
            echo json_encode(['Mensaje' => 'Error: No se actualizó la factura' ,'color'=>'danger']);
        }
    }
    


    public function updateFactura($f3) {
        $facturaID = $f3->get('POST.FacturaID');
        $fecha = $f3->get('POST.Fecha');
        $nombreCliente = $f3->get('POST.NombreCliente');
        $id_mesa = $f3->get('POST.IdMesa');
        $total = $f3->get('POST.Total');
        $estado = $f3->get('POST.Estado');

        $cadenaSql = "UPDATE facturas SET fecha = '" . $fecha . "', nombreCliente = '" . $nombreCliente . "', id_mesa = '" . $id_mesa . "', total = '" . $total . "', estado = '" . $estado . "' WHERE id = '" . $facturaID . "'";
        $result = $f3->DB->exec($cadenaSql);

        if ($result !== false) {
            echo json_encode([
                'Mensaje' => 'Se guardó correctamente',
                'color'=>'success'
            ]);
        } else {
            echo json_encode(['Mensaje' => 'Error: No se actualizó la factura' ,'color'=>'danger']);
        }
    }
    public function qr($f3) {
        $qr = $f3->get('POST.Qr');
        $nombreCliente = $f3->get('POST.NombreCliente');

        if (empty($qr)) {
            echo json_encode([
                'Mensaje' => 'Error: El qr es requerido',
                'cantidad' => 0,
                'data' => [],
                'color'=>'danger'
            ]);
            exit;
        }
        if (empty($nombreCliente)) {
            echo json_encode([
                'Mensaje' => 'Error: El Nombre Cliente es requerido',
                'cantidad' => 0,
                'data' => [],
                'color'=>'danger'
            ]);
            exit;
        }
        $cadenaSql = "SELECT fac.id FROM facturas fac  INNER JOIN mesas m ON fac.id_mesa = m.id WHERE m.codigo_qr = '" . $qr . "' AND fac.nombreCliente = '".$nombreCliente."' AND fac.estado = '1';";
        $items = $f3->DB->exec($cadenaSql);
        echo json_encode([
            'Mensaje' => count($items) > 0 ? 'Se encontró la cuenta' : 'No se encontró la cuenta',
            'cantidad' => count($items),
            'data' => $items,
            'color' => count($items) > 0 ? 'success' : 'danger'
        ]);
    }
    public function eliminarFactura($f3) {
        $facturaID = $f3->get('POST.FacturaID');
        if (empty($facturaID)) {
            echo json_encode([
                'Mensaje' => 'Error: El FacturaID es requerido',
                'cantidad' => 0,
                'data' => [],
                'color'=>'danger'
            ]);
            exit;
        }

        $cadenaSql = "DELETE FROM facturas WHERE id = '" . $facturaID . "'";
        $result = $f3->DB->exec($cadenaSql);

        if ($result !== false) {
            echo json_encode([
                'Mensaje' => 'Se eliminó correctamente',
                'color'=>'success'
            ]);
        } else {
            echo json_encode(['Mensaje' => 'Error: No se eliminó la factura' ,'color'=>'danger']);
        }
    }
}
?>
