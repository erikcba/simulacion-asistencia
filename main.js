
let alumnos = [];


function crearUsuario(event) {
    event.preventDefault();
    const nombreAlumnoInput = document.getElementById('agregar-nombre').value;
    const clasesAlumnoInput = document.getElementById('agregar-clases').value;
    const aptoInput = document.getElementById('agregar-apto-medico').value;
    
    const imgPerfil = './imagenes/img-perfil.svg';
    

    if (nombreAlumnoInput === "" || clasesAlumnoInput === "" || aptoInput === "" ) {

        alert("Falta completar un campo")

    } else {

        let alumno = {
            imagen: imgPerfil,
            nombre: nombreAlumnoInput,
            clases: clasesAlumnoInput,
            apto: aptoInput,
        }
    
        alumnos.push(alumno);
        localStorage.setItem("alumnos", JSON.stringify(alumnos))


        const listaAlumnos = document.getElementById('lista-alumnos');
        const div = document.createElement("div");
        div.classList.add("alumno");
        div.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
        </svg>

        <span id="nombreAlumno">${alumno.nombre}</span>
        <span id="clasesAlumno">${alumno.clases}</span>
        <span id="aptoAlumno">${alumno.apto}</span>

        `
        listaAlumnos.appendChild(div)

        
        
    }

    

}
