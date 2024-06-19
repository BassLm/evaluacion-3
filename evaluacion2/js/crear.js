document.addEventListener('DOMContentLoaded', function() {
    cargarSelectUsuario();
    cargarSelectCliente();
    cargarSelectTipoGestion();
    cargarSelectResultado();

    document.getElementById('crearGestionForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const id_usuario = document.getElementById('sel_id_usuario').value;
        const id_cliente = document.getElementById('sel_id_cliente').value;
        const id_tipo_gestion = document.getElementById('sel_id_tipo_gestion').value;
        const id_resultado = document.getElementById('sel_id_resultado').value;
        const comentarios = document.getElementById('txt_comentarios').value;
        const fecha_registro = obtenerFechaHora();

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "id_usuario": id_usuario,
            "id_cliente": id_cliente,
            "id_tipo_gestion": id_tipo_gestion,
            "id_resultado": id_resultado,
            "comentarios": comentarios,
            "fecha_registro": fecha_registro
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://144.126.210.74:8080/api/gestion", requestOptions)
            .then(response => {
                if (response.ok) {
                    alert('Gestión creada con éxito');
                    window.location.href = 'listar.html';
                } else {
                    alert('Error al crear la gestión');
                }
            })
            .catch(error => console.error('Error:', error));
    });

    function obtenerFechaHora() {
        var fechaActual = new Date();
        var fechaFormateada = fechaActual.toLocaleString('es-ES', {
            hour12: false,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/, '$3-$2-$1 $4:$5:$6');
        return fechaFormateada;
    }

    function cargarSelectUsuario() {
        fetch("http://144.126.210.74:8080/api/usuario?_size=200")
            .then(response => response.json())
            .then(data => {
                const selectUsuario = document.getElementById('sel_id_usuario');
                data.forEach(usuario => {
                    const option = document.createElement('option');
                    option.value = usuario.id_usuario;
                    option.textContent = `${usuario.apellidos} ${usuario.nombres}`;
                    selectUsuario.appendChild(option);
                });
            })
            .catch(error => console.error('Error:', error));
    }

    function cargarSelectCliente() {
        fetch("http://144.126.210.74:8080/api/cliente?_size=200")
            .then(response => response.json())
            .then(data => {
                const selectCliente = document.getElementById('sel_id_cliente');
                data.forEach(cliente => {
                    const option = document.createElement('option');
                    option.value = cliente.id_cliente;
                    option.textContent = `${cliente.apellidos} ${cliente.nombres}`;
                    selectCliente.appendChild(option);
                });
            })
            .catch(error => console.error('Error:', error));
    }

    function cargarSelectTipoGestion() {
        fetch("http://144.126.210.74:8080/api/tipo_gestion?_size=200")
            .then(response => response.json())
            .then(data => {
                const selectTipoGestion = document.getElementById('sel_id_tipo_gestion');
                data.forEach(tipoGestion => {
                    const option = document.createElement('option');
                    option.value = tipoGestion.id_tipo_gestion;
                    option.textContent = tipoGestion.nombre_tipo_gestion;
                    selectTipoGestion.appendChild(option);
                });
            })
            .catch(error => console.error('Error:', error));
    }

    function cargarSelectResultado() {
        fetch("http://144.126.210.74:8080/api/resultado?_size=200")
            .then(response => response.json())
            .then(data => {
                const selectResultado = document.getElementById('sel_id_resultado');
                data.forEach(resultado => {
                    const option = document.createElement('option');
                    option.value = resultado.id_resultado;
                    option.textContent = resultado.nombre_resultado;
                    selectResultado.appendChild(option);
                });
            })
            .catch(error => console.error('Error:', error));
    }
});
