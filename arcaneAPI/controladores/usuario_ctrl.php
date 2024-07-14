<?php
class usuario_ctrl {
    public function login($f3) {
        $usuario = $f3->get('POST.Usuario');
        $password = $f3->get('POST.Password');

        if (empty($usuario)) {
            echo json_encode([
                'Mensaje' => 'Error: El Usuario es requerido',
                'cantidad' => 0,
                'data' => [],
                'color'=>'danger'
            ]);
            exit;
        }
        if (empty($password)) {
            echo json_encode([
                'Mensaje' => 'Error: La contraseña es requerida',
                'cantidad' => 0,
                'data' => [],
                'color'=>'danger'
            ]);
            exit;
        }
        $cadenaSql = "SELECT * FROM `usuarios`";
        $cadenaSql .= " WHERE  usuario = '".$usuario;
        $cadenaSql .= "' AND  contrasena = '".$password."';";

        $items = $f3->DB->exec($cadenaSql);
        echo json_encode([
            'Mensaje' => count($items) > 0 ? 'Se inicio Sesion' : 'Credenciales erroneas',
            'cantidad' => count($items),
            'data' => $items,
            'color' => count($items) > 0 ? 'success' : 'danger'
        ]);
    }
    public function listarUsuarios($f3) {
        $cadenaSql = "SELECT * FROM usuarios";
        $items = $f3->DB->exec($cadenaSql);
        echo json_encode([
            'Mensaje' => count($items) > 0 ? 'Operación Exitosa' : 'No hay registros para la consulta',
            'cantidad' => count($items),
            'data' => $items,
            'color' => count($items) > 0 ? 'success' : 'danger'
        ]);
    }

    public function getUsuarioID($f3) {
        $usuario_id = $f3->get('POST.UsuarioID');
        if (empty($usuario_id)) {
            echo json_encode([
                'Mensaje' => 'Error: El UsuarioID es requerido',
                'cantidad' => 0,
                'data' => [],
                'color'=>'danger'
            ]);
            exit;
        }
        $cadenaSql = "SELECT * FROM usuarios WHERE id = " . $usuario_id . ";";
        $items = $f3->DB->exec($cadenaSql);
        echo json_encode([
            'Mensaje' => count($items) > 0 ? 'Se encontró el usuario' : 'No se encontró el usuario',
            'cantidad' => count($items),
            'data' => $items,
            'color' => count($items) > 0 ? 'success' : 'danger'
        ]);
    }

    public function insertUsuario($f3) {
        $nombre = $f3->get('POST.Nombre');
        $usuario = $f3->get('POST.usuario');
        $password = $f3->get('POST.password');
        $admin = $f3->get('POST.Admin');

        $cadenaSql = "INSERT INTO usuarios (nombre, usuario, contrasena, es_admin) VALUES ('" . $nombre . "', '" . $usuario . "', '" . $password . "', '" . $admin . "')";
        $result = $f3->DB->exec($cadenaSql);

        if ($result !== false) {
            echo json_encode([
                'Mensaje' => 'Se guardó correctamente',
                'color'=>'success'
            ]);
        } else {
            echo json_encode(['Mensaje' => 'Error: No se inserto el usuario' ,'color'=>'danger']);
        }
    }

    public function updateUsuario($f3) {
        $usuarioID = $f3->get('POST.UsuarioID');
        $nombre = $f3->get('POST.Nombre');
        $usuario = $f3->get('POST.usuario');
        $password = $f3->get('POST.password');
        $admin = $f3->get('POST.Admin');

        $cadenaSql = "UPDATE usuarios SET nombre = '" . $nombre . "', usuario = '" . $usuario . "', contrasena = '" . $password . "', es_admin = '" . $admin . "' WHERE id = '" . $usuarioID . "'";
        $result = $f3->DB->exec($cadenaSql);

        if ($result !== false) {
            echo json_encode([
                'Mensaje' => 'Se guardó correctamente',
                'color'=>'success'
            ]);
        } else {
            echo json_encode(['Mensaje' => 'Error: No se inserto el usuario' ,'color'=>'danger']);
        }
    }

    public function eliminarUsuario($f3) {
        $usuarioID = $f3->get('POST.UsuarioID');
        $cadenaSql = "DELETE FROM usuarios WHERE id = '" . $usuarioID . "'";
        $result = $f3->DB->exec($cadenaSql);

        if ($result !== false) {
            echo json_encode([
                'Mensaje' => 'Se elimino correctamente',
                'color'=>'success'
            ]);
        } else {
            echo json_encode(['Mensaje' => 'Error: No se elimino el usuario' ,'color'=>'danger']);
        }
    }
}
?>
