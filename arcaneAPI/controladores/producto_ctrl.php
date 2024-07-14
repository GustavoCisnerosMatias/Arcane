<?php
class producto_ctrl {
    public function listarProductos($f3) {
        $cadenaSql = "SELECT * FROM productos";
        $items = $f3->DB->exec($cadenaSql);
        echo json_encode([
            'Mensaje' => count($items) > 0 ? 'Operación Exitosa' : 'No hay registros para la consulta',
            'cantidad' => count($items),
            'data' => $items,
            'color' => count($items) > 0 ? 'success' : 'danger'
        ]);
    }

    public function getProductoID($f3) {
        $producto_id = $f3->get('POST.ProductoID');
        if (empty($producto_id)) {
            echo json_encode([
                'Mensaje' => 'Error: El ProductoID es requerido',
                'cantidad' => 0,
                'data' => [],
                'color'=>'danger'
            ]);
            exit;
        }
        $cadenaSql = "SELECT * FROM productos WHERE id = " . $producto_id . ";";
        $items = $f3->DB->exec($cadenaSql);
        echo json_encode([
            'Mensaje' => count($items) > 0 ? 'Se encontró el producto' : 'No se encontró el producto',
            'cantidad' => count($items),
            'data' => $items,
            'color' => count($items) > 0 ? 'success' : 'danger'
        ]);
    }

    public function insertProducto($f3) {
        $nombre = $f3->get('POST.Nombre');
        $descripcion = $f3->get('POST.Descripcion');
        $precio = $f3->get('POST.Precio');
        $img = $f3->get('POST.Img'); 
    
        $cadenaSql = "INSERT INTO productos (nombre, descripcion, precio, img) VALUES ('" . $nombre . "', '" . $descripcion . "', '" . $precio . "', '" . $img . "')";
        $result = $f3->DB->exec($cadenaSql);
    
        if ($result !== false) {
            echo json_encode([
                'Mensaje' => 'Se guardó correctamente',
                'color' => 'success'
            ]);
        } else {
            echo json_encode([
                'Mensaje' => 'Error: No se insertó el producto',
                'color' => 'danger'
            ]);
        }
    }

    public function updateProducto($f3) {
        $productoID = $f3->get('POST.ProductoID');
        $nombre = $f3->get('POST.Nombre');
        $descripcion = $f3->get('POST.Descripcion');
        $precio = $f3->get('POST.Precio');
        $img = $f3->get('POST.Img'); // Obtener el campo de imagen
    
        $cadenaSql = "UPDATE productos SET nombre = '" . $nombre . "', descripcion = '" . $descripcion . "', precio = '" . $precio . "', img = '" . $img . "' WHERE id = '" . $productoID . "'";
        $result = $f3->DB->exec($cadenaSql);
    
        if ($result !== false) {
            echo json_encode([
                'Mensaje' => 'Se actualizó correctamente',
                'color' => 'success'
            ]);
        } else {
            echo json_encode([
                'Mensaje' => 'Error: No se actualizó el producto',
                'color' => 'danger'
            ]);
        }
    }

    public function eliminarProducto($f3) {
        $productoID = $f3->get('POST.ProductoID');
        if (empty($productoID)) {
            echo json_encode([
                'Mensaje' => 'Error: El ProductoID es requerido',
                'cantidad' => 0,
                'data' => [],
                'color'=>'danger'
            ]);
            exit;
        }

        $cadenaSql = "DELETE FROM productos WHERE id = '" . $productoID . "'";
        $result = $f3->DB->exec($cadenaSql);

        if ($result !== false) {
            echo json_encode([
                'Mensaje' => 'Se eliminó correctamente',
                'color'=>'success'
            ]);
        } else {
            echo json_encode(['Mensaje' => 'Error: No se eliminó el producto' ,'color'=>'danger']);
        }
    }
}
?>
