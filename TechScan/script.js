// script.js

function obtenerDatos() {
    var nombre = document.getElementById('nombreInput').value.trim();
    var edad = document.getElementById('edadInput').value.trim();
    var fechaNacimiento = document.getElementById('fechaNacimientoInput').value.trim();
    var lugarNacimiento = document.getElementById('lugarNacimientoInput').value.trim();
    var telefono = document.getElementById('telefonoInput').value.trim();
    var telefonoFamiliar = document.getElementById('telefonoFamiliarInput').value.trim();
    var direccion = document.getElementById('direccionInput').value.trim();

    return {
        nombre: nombre,
        edad: edad,
        fechaNacimiento: fechaNacimiento,
        lugarNacimiento: lugarNacimiento,
        telefono: telefono,
        telefonoFamiliar: telefonoFamiliar,
        direccion: direccion
    };
}

function generarCodigoQR() {
    var datos = obtenerDatos();

    // Verificar si algún campo está vacío
    for (var key in datos) {
        if (datos[key] === '') {
            alert('Por favor, completa todos los campos antes de generar el código QR.');
            return;
        }
    }

    // Formatea los datos en una cadena
    var datosFormateados = '';
    for (var key in datos) {
        datosFormateados += `${key}: ${datos[key]}\n`;
    }

    // Configura las opciones del código QR con un tamaño más grande
    var opciones = {
        text: datosFormateados,
        width: 350,
        height: 350
    };

    // Crea un nuevo contenedor para el código QR con un contorno blanco
    var nuevoCodigoQRContainer = document.createElement('div');
    nuevoCodigoQRContainer.style.border = '2px solid white';
    document.getElementById('codigoQR').innerHTML = '';
    document.getElementById('codigoQR').appendChild(nuevoCodigoQRContainer);

    // Genera el código QR y lo muestra en el nuevo contenedor
    new QRCode(nuevoCodigoQRContainer, opciones);

    // Estiliza el nuevo contenedor para colocarlo a la derecha con un margen
    nuevoCodigoQRContainer.style.position = 'fixed';
    nuevoCodigoQRContainer.style.top = '50%';
    nuevoCodigoQRContainer.style.right = '20px';
    nuevoCodigoQRContainer.style.transform = 'translateY(-50%)';
    nuevoCodigoQRContainer.style.marginRight = '20px'; // Ajusta el margen derecho según tus preferencias
    nuevoCodigoQRContainer.style.backgroundColor = 'white'; // Añade un fondo blanco para mejorar la legibilidad
    nuevoCodigoQRContainer.style.padding = '10px'; // Añade un espacio alrededor del contenedor
}

function generarPDF() {
    var datos = obtenerDatos();

    // Verificar si algún campo está vacío
    for (var key in datos) {
        if (datos[key] === '') {
            alert('Por favor, completa todos los campos antes de generar el PDF.');
            return;
        }
    }

    // Formatea los datos en una cadena
    var datosFormateados = '';
    for (var key in datos) {
        datosFormateados += `<p><strong>${key}:</strong> ${datos[key]}</p>`;
    }

    // Crea un nuevo objeto jsPDF
    var pdf = new jsPDF();

    // Agrega los datos al PDF
    pdf.fromHTML(datosFormateados, 15, 15);

    // Guarda el PDF con un nombre específico
    pdf.save('formulario.pdf');
}
