<?php
class mesa_ctrl {
    public function listarMesas($f3) {
        $cadenaSql = "SELECT * FROM mesas";
        $items = $f3->DB->exec($cadenaSql);
        echo json_encode([
            'Mensaje' => count($items) > 0 ? 'Operación Exitosa' : 'No hay registros para la consulta',
            'cantidad' => count($items),
            'data' => $items,
            'color' => count($items) > 0 ? 'success' : 'danger'
        ]);
    }

    public function getMesaID($f3) {
        $mesa_id = $f3->get('POST.MesaID');
        if (empty($mesa_id)) {
            echo json_encode([
                'Mensaje' => 'Error: El MesaID es requerido',
                'cantidad' => 0,
                'data' => [],
                'color'=>'danger'
            ]);
            exit;
        }
        $cadenaSql = "SELECT * FROM mesas WHERE id = " . $mesa_id . ";";
        $items = $f3->DB->exec($cadenaSql);
        echo json_encode([
            'Mensaje' => count($items) > 0 ? 'Se encontró la mesa' : 'No se encontró la mesa',
            'cantidad' => count($items),
            'data' => $items,
            'color' => count($items) > 0 ? 'success' : 'danger'
        ]);
    }

    public function insertMesa($f3) {
        $numero_mesa = $f3->get('POST.NumeroMesa');
        $codigo_qr = $f3->get('POST.CodigoQR');
        $estado = $f3->get('POST.Estado');

        $cadenaSql = "INSERT INTO mesas (numero_mesa, codigo_qr, estado) VALUES ('" . $numero_mesa . "', '" . $codigo_qr . "', '" . $estado . "')";
        $result = $f3->DB->exec($cadenaSql);

        if ($result !== false) {
            echo json_encode([
                'Mensaje' => 'Se guardó correctamente',
                'color'=>'success'
            ]);
        } else {
            echo json_encode(['Mensaje' => 'Error: No se inserto la mesa' ,'color'=>'danger']);
        }
    }

    public function updateMesa($f3) {
        $mesaID = $f3->get('POST.MesaID');
        $numero_mesa = $f3->get('POST.NumeroMesa');
        $codigo_qr = $f3->get('POST.CodigoQR');
        $estado = $f3->get('POST.Estado');

        $cadenaSql = "UPDATE mesas SET numero_mesa = '" . $numero_mesa . "', codigo_qr = '" . $codigo_qr . "', estado = '" . $estado . "' WHERE id = '" . $mesaID . "'";
        $result = $f3->DB->exec($cadenaSql);

        if ($result !== false) {
            echo json_encode([
                'Mensaje' => 'Se guardó correctamente',
                'color'=>'success'
            ]);
        } else {
            echo json_encode(['Mensaje' => 'Error: No se actualizó la mesa' ,'color'=>'danger']);
        }
    }

    public function eliminarMesa($f3) {
        $mesaID = $f3->get('POST.MesaID');
        if (empty($mesaID)) {
            echo json_encode([
                'Mensaje' => 'Error: El MesaID es requerido',
                'cantidad' => 0,
                'data' => [],
                'color'=>'danger'
            ]);
            exit;
        }

        $cadenaSql = "DELETE FROM mesas WHERE id = '" . $mesaID . "'";
        $result = $f3->DB->exec($cadenaSql);

        if ($result !== false) {
            echo json_encode([
                'Mensaje' => 'Se eliminó correctamente',
                'color'=>'success'
            ]);
        } else {
            echo json_encode(['Mensaje' => 'Error: No se eliminó la mesa' ,'color'=>'danger']);
        }
    }
}
?>
