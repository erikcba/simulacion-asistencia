
let alumnosLStorageGral = [];

document.addEventListener("DOMContentLoaded", function () {
    // obtener alumnos del LS
    const alumnosGuardados = localStorage.getItem("alumnos");
    if (alumnosGuardados) {
      alumnosLStorageGral = JSON.parse(alumnosGuardados);
      // completar lista y mostrar alumnos en LS
      alumnosListado();
    }
  });
  
  function alumnosListado() {
    const listaAlumnos = document.getElementById("lista-alumnos");
    listaAlumnos.innerHTML = "";
  
    alumnosLStorageGral.forEach((alumno) => {
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
          <svg id="btnEliminar" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
          </svg>`;
  
      listaAlumnos.appendChild(div);
  
      // Add event listener to the newly created delete button
      const btnEliminar = div.querySelector("#btnEliminar");
      btnEliminar.addEventListener("click", (e) => {
        const div = e.target.closest(".alumno");
        const nombreAlumno = div.querySelector("#nombreAlumno").textContent;
        const index = alumnosLStorageGral.findIndex(
          (alumnoLStorage) => alumnoLStorage.nombre === nombreAlumno
        );
        if (index !== -1 && div) {
          div.remove();
          alumnosLStorageGral.splice(index, 1);
          localStorage.setItem("alumnos", JSON.stringify(alumnosLStorageGral));
        }
      });
    });
}

function crearUsuario(event) {
    event.preventDefault();
    const nombreAlumnoInput = document.getElementById('agregar-nombre').value;
    const clasesAlumnoInput = document.getElementById('agregar-clases').value;
    const aptoInput = document.getElementById('agregar-apto-medico').value;
    const horarioAlumno = document.getElementById('horario-clase').value;
    
    const imgPerfil = './imagenes/img-perfil.svg';
    

    if (nombreAlumnoInput === "" || clasesAlumnoInput === "" || aptoInput === "" ) {

        alert("Falta completar un campo")

    } else {

        let alumno = {
            imagen: imgPerfil,
            nombre: nombreAlumnoInput,
            clases: clasesAlumnoInput,
            apto: aptoInput,
            horario:horarioAlumno,
        }
    
        alumnosLStorageGral.push(alumno);
        localStorage.setItem("alumnos", JSON.stringify(alumnosLStorageGral))


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

        <svg id="btnEliminar" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
        </svg>
        
        `
        listaAlumnos.appendChild(div)


        // eliminar alumno mal anotado 
        const btnEliminar = document.querySelectorAll('#btnEliminar');

        btnEliminar.forEach(button => {
            button.addEventListener("click", (e) => {
                const div = e.target.closest(".alumno");
                const nombreAlumno = div.querySelector("#nombreAlumno").textContent;
                const index = alumnosLStorageGral.findIndex(alumnoLStorage => alumnoLStorage.nombre === nombreAlumno);
                if (index !== -1 && div) {
                    div.remove();
                    alumnosLStorageGral.splice(index, 1);
                    localStorage.setItem("alumnos", JSON.stringify(alumnosLStorageGral));
                }
            });
        });
        
                
    }
    

}

//////////////////// Filtrar alumnos por clase ////////////////////////////


const selectClases = document.getElementById('filtrar-horarios');

selectClases.addEventListener('change', function(){
    
    const alumnosLStorageGral = JSON.parse(localStorage.getItem("alumnos"));

    let horarioSeleccionado = selectClases.value;

    const alumnosPorHora = alumnosLStorageGral.filter(alumno => alumno.horario === horarioSeleccionado)
    const listaAlumnos = document.getElementById('lista-alumnos-horario');
    listaAlumnos.innerHTML = "";
    alumnosPorHora.forEach(alumno => {
        
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

            <svg id="btnEliminar" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
        
        `
        listaAlumnos.appendChild(div);

        // eliminar alumno mal anotado 
        const btnEliminar = div.querySelector('#btnEliminar');

        btnEliminar.addEventListener("click", (e) => {
            const div = e.target.closest(".alumno");
            const index = alumnosLStorageGral.findIndex(alumnoLStorage => alumnoLStorage.nombre === alumno.nombre);
            if (index !== -1 && div) {
                div.remove();
                alumnosLStorageGral.splice(index, 1);
                localStorage.setItem("alumnos", JSON.stringify(alumnosLStorageGral));
            }
        });
    })

})

