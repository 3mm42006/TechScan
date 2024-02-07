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

    // Formatea los datos en una cadena sin etiquetas HTML
    var datosFormateados = '';
    for (var key in datos) {
        datosFormateados += `${key}: ${datos[key]}\n`;
    }

    // Configura las opciones del código QR
    var opciones = {
        text: datosFormateados,
        width: 300, // Ajusta el tamaño del QR según tus preferencias
        height: 300 // Ajusta el tamaño del QR según tus preferencias
    };

    // Genera el código QR
    var nuevoCodigoQRContainer = document.createElement('div');
    nuevoCodigoQRContainer.style.padding = '5px'; // Añade espacio interno para mejorar la legibilidad
    nuevoCodigoQRContainer.style.backgroundColor = 'white'; // Cambia el color de fondo del contenedor a blanco
    nuevoCodigoQRContainer.style.display = 'inline-block'; // Hace que el contenedor se comporte como un elemento en línea
    new QRCode(nuevoCodigoQRContainer, opciones);

    // Agrega el contenedor del código QR al documento
    document.getElementById('codigoQR').innerHTML = '';
    document.getElementById('codigoQR').appendChild(nuevoCodigoQRContainer);

    // Estiliza el nuevo contenedor para colocarlo a la derecha con un margen
    nuevoCodigoQRContainer.style.position = 'fixed';
    nuevoCodigoQRContainer.style.top = '50%';
    nuevoCodigoQRContainer.style.right = '50px';
    nuevoCodigoQRContainer.style.transform = 'translateY(-50%)';
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

    // Formatea los datos en una cadena sin etiquetas HTML
    var datosFormateados = '';
    for (var key in datos) {
        datosFormateados += `${key}: ${datos[key]}\n`;
    }

    // Crea un nuevo objeto jsPDF
    var pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'letter'
    });

    // Añade el título "DATOS" centrado y con estilo
    pdf.setFontSize(24); // Tamaño más grande
    pdf.setTextColor(0, 0, 0); // Color negro
    pdf.text('DATOS', pdf.internal.pageSize.width / 2, 20, {align: 'center'}); // Texto centrado

    // Crea un contenedor para los datos con contorno
    pdf.setDrawColor(0); // Color de contorno negro
    pdf.setFillColor(255, 255, 255); // Fondo blanco
    pdf.rect(20, 30, pdf.internal.pageSize.width - 40, 140, 'FD'); // Rectángulo con contorno y relleno

    // Añade los datos al PDF con un tamaño de fuente más grande
    pdf.setFontSize(14); // Tamaño de fuente más grande
    pdf.setTextColor(0); // Color de texto negro
    pdf.text('Nombre: ' + datos.nombre, 30, 45);
    pdf.text('Edad: ' + datos.edad, 30, 60);
    pdf.text('Fecha de Nacimiento: ' + datos.fechaNacimiento, 30, 75);
    pdf.text('Lugar de Nacimiento: ' + datos.lugarNacimiento, 30, 90);
    pdf.text('Teléfono: ' + datos.telefono, 30, 105);
    pdf.text('Teléfono Familiar: ' + datos.telefonoFamiliar, 30, 120);
    pdf.text('Dirección: ' + datos.direccion, 30, 135);

    // Crea un nuevo contenedor para el código QR con un tamaño más grande
    var nuevoCodigoQRContainer = document.createElement('div');
    nuevoCodigoQRContainer.style.width = '150px'; // Ajusta el tamaño del contenedor del QR según tus preferencias

    // Genera el código QR y lo muestra en el nuevo contenedor
    new QRCode(nuevoCodigoQRContainer, {
        text: datosFormateados,
        width: 150, // Ajusta el tamaño del QR según tus preferencias
        height: 150 // Ajusta el tamaño del QR según tus preferencias
    });

    // Convierte el contenedor del código QR en una imagen base64
    var imagenCodigoQR = nuevoCodigoQRContainer.querySelector('canvas').toDataURL('image/png');

    // Agrega la imagen del código QR al PDF
    pdf.addImage(imagenCodigoQR, 'PNG', 150, 180, 40, 40); // Ajusta la posición y el tamaño del QR según tus preferencias

    // Guarda el PDF con un nombre específico
    pdf.save('formulario.pdf');
}
