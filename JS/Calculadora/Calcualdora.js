export function calculadora() {
  const pantalla = document.querySelector(".pantalla");
  const btn = document.querySelectorAll(".func .btn");
  let resultadoObtenido = false;
  let op = "";
  let datosmostrar;
  let resultadoAnterior = ""; 



  btn.forEach((boton) => {
    boton.addEventListener("click", async () => {
      datosmostrar = boton.textContent;

      async function M() {
        const contenedor = document.querySelector(".Memory .data #btnmemory");

        if (contenedor) {
          const btnsmemoy = contenedor.querySelectorAll(".btn");

          btnsmemoy.forEach((btn) => {
            btn.addEventListener("click", () => {
              resultadoObtenido = true;
            });
          });
        }
      }

      if (boton.id === "%") {
        try {
          if (resultadoObtenido) {
            // Si ya se ha obtenido un resultado anteriormente
            pantalla.textContent = parseFloat(pantalla.textContent) / 100;
            resultadoObtenido = true; // Restablecer la variable resultadoObtenido a false después de dividir porcentaje
          }
          return;
        } catch (error) {
          pantalla.textContent = "Error!";
          return;
        }
      }

      if (boton.id === "CE") {
        if (
          pantalla.textContent.length === 1 ||
          pantalla.textContent === "Error!"
        ) {
          pantalla.textContent = "0";
        } else {
          let contenido = pantalla.textContent;

          // Reemplazar el contenido con el último número eliminado
          pantalla.textContent = contenido.replace(/\d+$/, "");
        }
        return;
      }

      if (boton.id === "C") {
        pantalla.textContent = "0";
        return;
      }

      if (boton.id === "borrar") {
        if (
          pantalla.textContent.length === 1 ||
          pantalla.textContent === "Error!"
        ) {
          pantalla.textContent = "0";
        } else {
          pantalla.textContent = pantalla.textContent.slice(0, -1);
        }

        return;
      }

      if (boton.id === "1/x") {
        try {
          let valor = parseFloat(pantalla.textContent);
          if (valor !== 0) {
            pantalla.textContent = 1 / valor;
            resultadoObtenido = true;
          } else {
            pantalla.textContent = "Error al dividir por cero!";
            resultadoObtenido = true;
          }
          return;
        } catch (error) {
          pantalla.textContent = "Error!";
          return;
        }
      }

      if (boton.id === "cuadrado") {
        try {
          let valor = parseFloat(pantalla.textContent);
          if (valor >= 0) {
            let resultado = Math.pow(valor, 2);
            pantalla.textContent = resultado;
            resultadoObtenido = true;
          } else {
            pantalla.textContent = "Error!";
            resultadoObtenido = true;
          }
          return;
        } catch (error) {
          pantalla.textContent = "Error!";
          return;
        }
      }

      if (boton.id === "raiz") {
        try {
          let resultado = Math.sqrt(parseFloat(pantalla.textContent));
          pantalla.textContent = resultado;
          resultadoObtenido = true;
          return;
        } catch (error) {
          pantalla.textContent = "Error!";
          return;
        }
      }

      if (boton.id === "+/-") {
        try {
          let numero = parseFloat(pantalla.textContent);
          pantalla.textContent = -1 * numero;
          return;
        } catch (error) {
          pantalla.textContent = "Error!";
          return;
        }
      }

      if (boton.id === "igual") {
        try {
          op = eval(pantalla.textContent);
          pantalla.textContent = op;
          resultadoAnterior = op; 
          resultadoObtenido = true;
          return;
        } catch (error) {
          pantalla.textContent = "Error!";
          return;
        }
      }

      if (["+","-","*","/"].includes(boton.id) && resultadoAnterior !== "") {
        pantalla.textContent = resultadoAnterior + datosmostrar;
        resultadoObtenido = false; 
        return;// Restablecer resultadoObtenido a false después de concatenar con el resultado anterior
      }

      if (pantalla.textContent === "0" || pantalla.textContent === "Error!") {
        pantalla.textContent = datosmostrar;
      } else {
        pantalla.textContent += datosmostrar;
      }

      if (resultadoObtenido) {
        pantalla.textContent = datosmostrar;
        resultadoAnterior = "";
        resultadoObtenido = false; // Restablecer resultadoObtenido a false después de reiniciar la pantalla
      }

      await M();
    });
  });

  document.getElementById("StoreMemory").addEventListener("click", () => {
    resultadoObtenido = true;
  });

  document.getElementById("recoverMemory").addEventListener("click", () => {
    if (op !== "") {
      resultadoObtenido = false;
    }
  });

  document.getElementById("AddMemory").addEventListener("click", () => {
    resultadoObtenido = true;
  });

  document.getElementById("subtractMemory").addEventListener("click", () => {
    resultadoObtenido = true;
  });
}
