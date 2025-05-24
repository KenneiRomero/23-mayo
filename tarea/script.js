const dueños = [];
const mascotas = [];

const generarId = () => Math.floor(Math.random() * 1000000);

const validarTexto = (texto) => texto && texto.trim() !== "";
const validarNumero = (valor) => !isNaN(valor) && Number(valor) > 0;
const estadosPermitidos = ["Sano", "Enfermo", "En tratamiento"];

const registrarDueñoAsync = (callback) => {
    const nombre = prompt("Nombre del dueño:");
    const cedula = prompt("Cédula:");
    const telefono = prompt("Teléfono:");
    const correo = prompt("Correo electrónico:");

    setTimeout(() => {
        if (![nombre, cedula, telefono, correo].every(validarTexto)) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const id = generarId();
        dueños.push({ id, nombre, cedula, telefono, correo });
        alert("Dueño registrado exitosamente ...");
        if (callback) callback();
    }, 1500);
};

const registrarMascotaAsync = (callback) => {
    const nombre = prompt("Nombre de la mascota:");
    const especie = prompt("Especie (Perro, Gato, Ave, Reptil, Otro):");
    const edad = parseFloat(prompt("Edad (en años):"));
    const peso = parseFloat(prompt("Peso (kg):"));
    const estadoSalud = prompt("Estado de salud (Sano, Enfermo, En tratamiento):");
    const cedulaDueño = prompt("Cédula del dueño:");

    setTimeout(() => {
        if (!validarTexto(nombre) || !validarTexto(especie) ||
            !validarNumero(edad) || !validarNumero(peso) ||
            !estadosPermitidos.includes(estadoSalud) || !validarTexto(cedulaDueño)) {
            alert("Datos inválidos.");
            return;
        }

        const dueño = dueños.find(d => d.cedula === cedulaDueño);
        if (!dueño) {
            alert("Dueño no encontrado.");
            return;
        }

        const id = generarId();
        mascotas.push({ id, nombre, especie, edad, peso, estadoSalud, dueñoId: dueño.id });
        alert("Mascota registrada exitosamente ...");
        if (callback) callback();
    }, 2000);
};

const buscarMascotaAsync = (nombre) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const mascota = mascotas.find(m => m.nombre.toLowerCase() === nombre.toLowerCase());
            if (mascota) {
                resolve(mascota);
            } else {
                reject("Mascota no encontrada.");
            }
        }, 1500);
    });
};

const actualizarEstadoSaludAsync = async () => {
    const nombre = prompt("Nombre de la mascota a actualizar:");
    const nuevaSalud = prompt("Nuevo estado de salud:");

    await new Promise(resolve => setTimeout(resolve, 1000));

    const mascota = mascotas.find(m => m.nombre.toLowerCase() === nombre.toLowerCase());
    if (!mascota) {
        alert("Mascota no encontrada.");
        return;
    }

    if (!estadosPermitidos.includes(nuevaSalud)) {
        alert("Estado de salud no válido.");
        return;
    }

    mascota.estadoSalud = nuevaSalud;
    alert("Estado de salud actualizado ...\n");
};

const eliminarMascotaAsync = (nombre) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const index = mascotas.findIndex(m => m.nombre.toLowerCase() === nombre.toLowerCase());
            if (index === -1) {
                reject("Mascota no encontrada.");
            } else {
                mascotas.splice(index, 1);
                resolve("Mascota eliminada exitosamente ...\n");
            }
        }, 2000);
    });
};

const verMascotasDeDueñoAsync = async () => {
    const cedula = prompt("Cédula del dueño:");
    const dueño = dueños.find(d => d.cedula === cedula);
    if (!dueño) {
        alert("Dueño no encontrado.");
        return;
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    const mascotasDueño = mascotas.filter(m => m.dueñoId === dueño.id);
    if (mascotasDueño.length === 0) {
        alert("Este dueño no tiene mascotas registradas.");
    } else {
        const lista = mascotasDueño.map(m => `${m.nombre} - ${m.especie} - ${m.estadoSalud}`).join('\n');
        alert(lista);
    }
};

const menu = () => {
    let opcion;
    const ciclo = async () => {
        do {
            opcion = prompt(`Seleccione una opción:\n1. Registrar dueño..\n2. Registrar mascota..\n3. Listar mascotas\n4. Buscar mascota..\n5. Actualizar salud ..\n6. Eliminar mascota ..\n7. Ver mascotas de dueño ..\n8. Salir`);

            switch (opcion) {
                case "1": registrarDueñoAsync(); break;
                case "2": registrarMascotaAsync(); break;
                case "3": listarMascotas(); break;
                case "4": {
                    const nombreBuscar = prompt("Nombre de la mascota a buscar:");
                    try {
                        const mascota = await buscarMascotaAsync(nombreBuscar);
                        alert(`Mascota encontrada: ${mascota.nombre}, ${mascota.especie}, ${mascota.estadoSalud}`);
                    } catch (err) {
                        alert(err);
                    }
                    break;
                }
                case "5": await actualizarEstadoSaludAsync(); break;
                case "6": {
                    const nombreEliminar = prompt("Nombre de la mascota a eliminar:");
                    try {
                        const mensaje = await eliminarMascotaAsync(nombreEliminar);
                        alert(mensaje);
                    } catch (err) {
                        alert(err);
                    }
                    break;
                }
                case "7": await verMascotasDeDueñoAsync(); break;
                case "8": alert("Saliendo..."); break;
                default: alert("Opción no válida.");
            }
        } while (opcion !== "8");
    };
    ciclo();
};

const listarMascotas = () => {
    if (mascotas.length === 0) {
        alert("No hay mascotas registradas.");
    } else {
        const lista = mascotas.map(m => `${m.nombre} - ${m.especie} - ${m.estadoSalud}`).join('\n');
        alert(lista);
    }
};

menu();