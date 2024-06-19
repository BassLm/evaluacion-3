var gestionToDelete = null;

function listarGestion() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "query": "select ges.id_gestion as id_gestion, cli.id_cliente, ges.comentarios as comentarios, CONCAT(cli.nombres, ' ', cli.apellidos) as cliente, CONCAT(usu.nombres, ' ', usu.apellidos) as usuario, tge.nombre_tipo_gestion as nombre_tipo_gestion, res.nombre_resultado as nombre_resultado, ges.fecha_registro as fecha_registro from gestion ges, usuario usu, cliente cli, tipo_gestion tge, resultado res where ges.id_usuario = usu.id_usuario and ges.id_cliente = cli.id_cliente and ges.id_tipo_gestion = tge.id_tipo_gestion and ges.id_resultado = res.id_resultado"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://144.126.210.74:8080/dynamic", requestOptions)
        .then(response => response.json())
        .then(json => {
            document.getElementById("data").innerHTML = "";
            json.forEach(completarFila);
            $('#tbl_gestion').DataTable();
        })
        .catch(error => console.error('error', error));
}

function completarFila(element, index, arr) {
    document.getElementById("data").innerHTML +=
        `<tr>
            <td>${element.id_gestion}</td>
            <td>${element.usuario}</td>
            <td>${element.cliente}</td>
            <td>${element.nombre_tipo_gestion}</td>
            <td>${element.nombre_resultado}</td>
            <td>${element.comentarios}</td>
            <td>${element.fecha_registro}</td>
            <td>
                <a href='actualizar.html?id=${element.id_gestion}' class='btn btn-warning btn-sm'>Actualizar</a>
                <button class='btn btn-danger btn-sm' onclick='confirmarEliminar(${element.id_gestion})'>Eliminar</button>
            </td>
        </tr>`;
}

function confirmarEliminar(id_gestion) {
    gestionToDelete = id_gestion;
    var myModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'), {
        keyboard: false
    });
    myModal.show();
}

document.getElementById('btnConfirmDelete').addEventListener('click', function() {
    if (gestionToDelete) {
        eliminarGestion(gestionToDelete);
    }
});

function eliminarGestion(id_gestion) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/gestion/" + id_gestion, requestOptions)
        .then(response => {
            if (response.status === 200) {
                showSuccessToast();
                setTimeout(function() {
                    location.reload();
                }, 1500);
            } else {
                alert("Error al eliminar la gestión");
            }
        })
        .catch(error => console.error('Error:', error));
}

function showSuccessToast() {
    var toastEl = document.getElementById('successToast');
    var toast = new bootstrap.Toast(toastEl);
    toast.show();
}