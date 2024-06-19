var g_id_tipo_gestion = "";

function agregarGestion() {
    var id_usuario = document.getElementById("sel_id_usuario").value;
    var id_cliente = document.getElementById("sel_id_cliente").value;
    var id_tipo_gestion = document.getElementById("sel_id_tipo_gestion").value;
    var id_resultado = document.getElementById("sel_id_resultado").value;
    var comentarios = document.getElementById("txt_comentarios").value;


    var fechaHoraActual = obtenerFechaHora();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "id_usuario": id_usuario,
        "id_cliente": id_cliente,
        "id_tipo_gestion": id_tipo_gestion,
        "id_resultado": id_resultado,
        "comentarios": comentarios,
        "fecha_registro": fechaHoraActual
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/gestion", requestOptions)
        .then(response => {
            if (response.status === 200) {
                location.href = "listar.html";
            } else if (response.status === 400) {
                alert("Error al crear gestión"); 
            }
        })
        .catch(error => console.error('Error:', error));
}

function cargarListasDesplegables() {
    cargarSelectResultado();
    cargarSelectCliente();
    cargarSelectUsuario();
    cargarSelectTipoGestion();
    obtenerFechaHora();
}


function cargarSelectResultado() {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/resultado?_size=200", requestOptions)
        .then(response => response.json())
        .then(json => {
            json.forEach(completarOpcionesResultado);
        })
        .catch(error => console.error('Error:', error));
}

function completarOpcionesResultado(element, index, arr) {
    document.getElementById("sel_id_resultado").innerHTML +=
        `<option value='${element.id_resultado}'>${element.nombre_resultado}</option>`;
}

function cargarSelectUsuario() {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/usuario?_size=200", requestOptions)
        .then(response => response.json())
        .then(json => {
            json.forEach(completarOpcionesUsuario);
        })
        .catch(error => console.error('Error:', error));
}

function completarOpcionesUsuario(element, index, arr) {
    document.getElementById("sel_id_usuario").innerHTML +=
        `<option value='${element.id_usuario}'>${element.apellidos} ${element.nombres}</option>`;
}


function cargarSelectCliente() {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/cliente?_size=200", requestOptions)
        .then(response => response.json())
        .then(json => {
            json.forEach(completarOpcionesCliente);
        })
        .catch(error => console.error('Error:', error));
}

function completarOpcionesCliente(element, index, arr) {
    document.getElementById("sel_id_cliente").innerHTML +=
        `<option value='${element.id_cliente}'>${element.apellidos} ${element.nombres}</option>`;
}

function cargarSelectTipoGestion() {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/tipo_gestion?_size=200", requestOptions)
        .then(response => response.json())
        .then(json => {
            json.forEach(completarOpcionesTipoGestion);
        })
        .catch(error => console.error('Error:', error));
}

function completarOpcionesTipoGestion(element, index, arr) {
    document.getElementById("sel_id_tipo_gestion").innerHTML +=
        `<option value='${element.id_tipo_gestion}'>${element.nombre_tipo_gestion}</option>`;
}


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
