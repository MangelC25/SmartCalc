export function cientifica() {
  const cientificaC = document.querySelector("#CalculadoraCientifica");
  const btn = cientificaC.querySelectorAll(".func .btn");
  const pantalla = cientificaC.querySelector(".pantalla");
  let resultadoObtenido = false;
  let op = "";
  let datosmostrar;
  let resultadoAnterior = "";
  let tipoOperacion = "";

  btn.forEach((boton) => {
    boton.addEventListener("click", async () => {
      datosmostrar = boton.textContent;

      const ultimoCaracterEsOperador = "+-*/".includes(
        pantalla.textContent.slice(-1)
      );

      // Si el botón presionado es un operador y el último carácter también lo es, no hacer nada
      if (["+", "-", "*", "/"].includes(boton.id) && ultimoCaracterEsOperador) {
        return;
      }

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

      if (boton.id === "pi") {
        if (/[\+\-\*\/]/.test(pantalla.textContent)) {
          pantalla.textContent += Math.PI;
        } else {
          if (!isNaN(parseFloat(pantalla.textContent))) {
            if (parseFloat(pantalla.textContent) !== 0) {
              pantalla.textContent = parseFloat(pantalla.textContent) * Math.PI;
              resultadoObtenido = true;
            } else {
              pantalla.textContent = Math.PI;
              resultadoObtenido = true;
            }
          }
        }
        return;
      }

      if (boton.id === "e") {
        if (/[\+\-\*\/]/.test(pantalla.textContent)) {
          pantalla.textContent += Math.E;
        } else {
          if (!isNaN(parseFloat(pantalla.textContent))) {
            if (parseFloat(pantalla.textContent) !== 0) {
              pantalla.textContent = parseFloat(pantalla.textContent) * Math.E;
              resultadoObtenido = true;
            } else {
              pantalla.textContent = Math.E;
              resultadoObtenido = true;
            }
          }
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

      if (boton.id === "absoluto") {
        try {
          let valor = parseFloat(pantalla.textContent);

          if (!isNaN(valor)) {
            pantalla.textContent = Math.abs(valor);
          }

          resultadoObtenido = true;
          return;
        } catch (error) {
          pantalla.textContent = "Error!";
          return;
        }
      }

      if (boton.id === "exp") {
        try {
          if (/\d+$/.test(pantalla.textContent)) {
            pantalla.textContent += `,e+0`;
            tipoOperacion = "exp";
            resultadoObtenido = false;
          }
          return;
        } catch (error) {
          pantalla.textContent = "Error!";
          return;
        }
      }

      if (boton.id === "+/-") {
        try {
          
          if (
            pantalla.textContent.includes(",e+") ||
            pantalla.textContent.includes(",e-")
          ) {
            if (/,e\+\d+/.test(pantalla.textContent)) {
              pantalla.textContent = pantalla.textContent.replace(
                /,e\+/,
                `,e-`
              );
            } else if (/,e\-\d+/.test(pantalla.textContent)) {
              pantalla.textContent = pantalla.textContent.replace(
                /,e\-/,
                `,e+`
              );
            }
          } else {
            if (/\d+[\+\-]\d+/.test(pantalla.textContent)) {
              let operadores = pantalla.textContent.match(/[\+\-]/g); // Encuentra todos los operadores
              let ultimoOperadorIndex = pantalla.textContent.lastIndexOf(
                operadores[operadores.length - 1]
              ); // Encuentra el índice del último operador
              if (operadores[operadores.length - 1] === "+") {
                pantalla.textContent =
                  pantalla.textContent.substring(0, ultimoOperadorIndex) +
                  "-" +
                  pantalla.textContent.substring(ultimoOperadorIndex + 1);
              } else {
                pantalla.textContent =
                  pantalla.textContent.substring(0, ultimoOperadorIndex) +
                  "+" +
                  pantalla.textContent.substring(ultimoOperadorIndex + 1);
              }
            } else if (/^\d/.test(pantalla.textContent)) {
              pantalla.textContent = "-" + pantalla.textContent;
            } else if (/^\-\d/.test(pantalla.textContent)) {
              pantalla.textContent = pantalla.textContent.substring(1);
            }

            resultadoAnterior = pantalla.textContent;
          }

          
          return;
        } catch (error) {
          pantalla.textContent = "Error!";
          return;
        }
      }

      if (boton.id === "igual") {
        try {
          if (tipoOperacion === "exp") {
            // Verificar si ",e+" está presente en la pantalla
            if (
              pantalla.textContent.includes(",e+") ||
              pantalla.textContent.includes(",e-")
            ) {
              // Obtener el último número antes de ",e+"
              const ultimoNumero = pantalla.textContent.match(
                /(\d*\.?\d+)(?=,e[\+\-])/
              );
              let numero = parseFloat(ultimoNumero[0]);
              let potencia = parseFloat(
                pantalla.textContent.match(/(\d+)$/)[0]
              );

              let resultado;

              if (/([\+\-\*\/]\d*)(?=,e[\+\-])/.test(pantalla.textContent)) {
                let NotacionC;
                let expresion = pantalla.textContent.match(
                  /[\d\+\-\*\/]+(?=\d+,e[\+\-])/g
                );

                let result;

                if (/,e\+/.test(pantalla.textContent)) {
                  if (potencia === 0) {
                    NotacionC = numero * Math.pow(10, 1);
                  } else {
                    NotacionC = numero * Math.pow(10, potencia);
                  }
                } else if (/,e\-/.test(pantalla.textContent)) {
                  if (potencia === 0) {
                    NotacionC = numero * Math.pow(10, -1);
                  } else {
                    NotacionC = numero * Math.pow(10, -potencia);
                  }
                }

                result = expresion + NotacionC;
                resultado = eval(result);
              } else if (ultimoNumero) {
                if (/,e\+/.test(pantalla.textContent)) {
                  if (potencia === 0) {
                    resultado = numero * Math.pow(10, 1);
                  } else {
                    resultado = numero * Math.pow(10, potencia);
                  }
                } else if (/,e\-/.test(pantalla.textContent)) {
                  if (potencia === 0) {
                    resultado = numero * Math.pow(10, -1);
                  } else {
                    resultado = numero * Math.pow(10, -potencia);
                  }
                }
              }

              pantalla.textContent = resultado;
              tipoOperacion = "";
              resultadoObtenido = true;
            }
          } else {
            op = eval(pantalla.textContent);
            pantalla.textContent = op;
            resultadoAnterior = op;
            tipoOperacion = "";
            resultadoObtenido = true;
          }
          return;
        } catch (error) {
          pantalla.textContent = "Error!";
          return;
        }
      }

      if (["+", "-", "*", "/"].includes(boton.id) && resultadoAnterior !== "") {
        pantalla.textContent = resultadoAnterior + datosmostrar;
        resultadoObtenido = false;
        return; // Restablecer resultadoObtenido a false después de concatenar con el resultado anterior
      }

      if (pantalla.textContent === "0" || pantalla.textContent === "Error!") {
        pantalla.textContent = datosmostrar;
      } else {
        if (
          pantalla.textContent.endsWith(",e+0") ||
          pantalla.textContent.endsWith(",e-0")
        ) {
          if (!isNaN(datosmostrar)) {
            // Reemplazar el "0" por el número ingresado
            pantalla.textContent = pantalla.textContent.replace(
              /0$/,
              datosmostrar
            );
          } else if (datosmostrar === "-") {
            // Cambiar el signo "+" por "-" y reemplazar el "0" por el valor numérico negativo
            pantalla.textContent = pantalla.textContent.replace(
              /,e\+0$/,
              `,e-0`
            );
          }
        } else {
          pantalla.textContent += datosmostrar;
        }
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
