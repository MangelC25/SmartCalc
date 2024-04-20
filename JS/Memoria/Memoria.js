export let data = "";
const containerM = document.querySelector(".m");
const overflowM = document.querySelector(".transparent");
const btn = document.querySelectorAll(".M .btn");
const pantalla = document.querySelector(".pantalla");
const clearMemory = document.querySelector("#ClearMemory");
const P = document.querySelector("#EmptyMemory")

function ActualizarMemoria(dato) {
  const contenedor = document.querySelector(".data");
  const DataM = contenedor.querySelector("#DataM");

  DataM.textContent = dato;
}

function agregarMemoria(dato) {
  const nuevoDiv = document.createElement("div");
  nuevoDiv.className = "data";
  nuevoDiv.innerHTML = `<span id="DataM">${dato}</span>
      <div id="btnmemory">
          <button class="btn" id="MC"><span>MC</span></button>
          <button class="btn" id="M+"><span>M+</span></button>
          <button class="btn" id="M-"><span>M-</span></button>
      </div>`;

  const contenedor = document.querySelector(".Memory");
  const primerDiv = contenedor.firstChild; // Obtener el primer div existente

  // Insertar el nuevo div antes del primer div existente
  contenedor.insertBefore(nuevoDiv, primerDiv);

  const btnmemory = nuevoDiv.querySelector("#btnmemory");
  const btnsmemoy = btnmemory.querySelectorAll(".btn");

  nuevoDiv.addEventListener("mouseenter", () => {
    btnmemory.style.visibility = "visible";
  });

  nuevoDiv.addEventListener("mouseleave", () => {
    btnmemory.style.visibility = "hidden";
  });

  btnsmemoy.forEach((btn) => {
    btn.addEventListener("click", () => {
      const contenedorMemoria = document.querySelector(".Memory");
      if (btn.id === "MC") {
        const elementoEliminar = contenedorMemoria.firstChild;
        elementoEliminar.style.transition = "opacity 0.5s ease";
        elementoEliminar.style.opacity = 0;
        setTimeout(() => {
          contenedorMemoria.removeChild(elementoEliminar);
        }, 500);
      } else if (btn.id === "M+") {
        data = parseFloat(pantalla.textContent) + data;
        ActualizarMemoria(data);
        return;
      } else if (btn.id === "M-") {
        data = parseFloat(pantalla.textContent) - data;
        ActualizarMemoria(data);
        return;
      }
    });
  });
}

function limpiarMemoria() {
  const contenedorMemoria = document.querySelector(".Memory");
  // Elimina solo los elementos .data del contenedor
  const dataElements = contenedorMemoria.querySelectorAll(".data");
  dataElements.forEach((element) => {
    contenedorMemoria.removeChild(element);
  });

  P.style.display = "block";
  clearMemory.style.display = "none";
}

export function Memory() {
  btn.forEach((boton) => {
    boton.disabled = true;
    btn[4].disabled = false;
    btn[2].disabled = false;
    btn[3].disabled = false;

    boton.addEventListener("click", () => {
      if (boton.id === "memoria") {
        if (
          containerM.style.maxHeight === "0px" ||
          !containerM.style.maxHeight
        ) {
          containerM.style.maxHeight = "100%";
          boton.classList.add("active");
        }
        overflowM.addEventListener("click", () => {
          if (containerM.style.maxHeight === "100%") {
            containerM.style.maxHeight = 0;
            boton.classList.remove("active");
          }
        });
      } else if (boton.id === "StoreMemory") {
        btn[5].disabled = false;
        btn[0].disabled = false;
        btn[1].disabled = false;
        P.style.display = "none";
        clearMemory.style.display = "block";
        data = parseFloat(pantalla.textContent);
        agregarMemoria(data);
        pantalla.textContent = "0";
      } else if (boton.id === "clearMemory") {
        btn[5].disabled = true;
        btn[0].disabled = true;
        btn[1].disabled = true;
        limpiarMemoria();
        data = "";
        return;
      } else if (boton.id === "recoverMemory") {
        if (pantalla.textContent === "0" || pantalla.textContent === "Error!") {
          pantalla.textContent = data;
        } else {
          pantalla.textContent += data;
        }
      } else if (boton.id === "AddMemory") {
        data = parseFloat(pantalla.textContent) + data;
        ActualizarMemoria(data);
        return;
      } else if (boton.id === "subtractMemory") {
        data = parseFloat(pantalla.textContent) - data;
        ActualizarMemoria(data);
        return;
      }
    });
  });

  clearMemory.addEventListener("click", () => {
    btn[5].disabled = true;
    btn[0].disabled = true;
    btn[1].disabled = true;
    limpiarMemoria();
    data = "";
    return;
  });
}
