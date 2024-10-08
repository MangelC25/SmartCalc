import { data } from "../Memoria/Memoria.js";

export function History() {
  const history = document.querySelector("#History");
  const scream = document.querySelector("#Historial");
  const operacion = document.querySelector(".operacion");
  const resultado = document.querySelector(".resultado");
  const btn = document.querySelectorAll(".func .btn");
  const copy = document.querySelector(".copy");

  let operacionActual = "";
  let tipoOperacion = "";
  let resultadoOperacion = "";
  let contador = 2;
  let resultadoAnterior = "";

  let resultadoObtenido = false;

  history.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 426px)").matches) {
      if (scream.style.maxWidth === "0px" || !scream.style.maxWidth) {
        scream.style.maxWidth = "100%";
      } else {
        scream.style.maxWidth = 0;
      }
    } else {
      if (scream.style.maxWidth === "0px" || !scream.style.maxWidth) {
        scream.style.maxWidth = scream.scrollWidth + "px";
      } else {
        scream.style.maxWidth = 0;
      }
    }
  });

  async function Mm() {
    const contenedor = document.querySelector(".Memory .data #btnmemory");

    if (contenedor) {
      const btnsmemoy = contenedor.querySelectorAll(".btn");

      btnsmemoy.forEach((btn) => {
        btn.addEventListener("click", () => {
          operacionActual = "";
          operacion.textContent = "--";
          return;
        });
      });
    }
  }

  function agregarDivHistorial(operacion, resultado) {
    const nuevoDiv = document.createElement("div");

    nuevoDiv.className = "info";
    nuevoDiv.innerHTML = `<span class="operacion">${operacion}</span>
        <span class="resultado">${resultado}</span>
        <button class="copy"><i class='bx bx-copy'></i></button>
        <hr>`;

    document.getElementById("H").appendChild(nuevoDiv);

    const nuevoBotonCopy = nuevoDiv.querySelector(".copy");
    nuevoBotonCopy.addEventListener("click", () => {
      const textoResultado = resultado.textContent;

      const elementoTemporal = document.createElement("textarea");
      elementoTemporal.value = textoResultado;
      document.body.appendChild(elementoTemporal);

      elementoTemporal.select();
      document.execCommand("copy");

      document.body.removeChild(elementoTemporal);

      nuevoBotonCopy.innerHTML = "<i class='bx bx-check'></i>";
      nuevoBotonCopy.disabled = true;
      nuevoBotonCopy.classList.add("disabled");
    });
  }

  btn.forEach((boton) => {
    boton.addEventListener("click", async () => {
      let datosmostrar = boton.textContent;

      const ultimoCaracterEsOperador = "+-*/".includes(
        operacion.textContent.slice(-1)
      );

      // Si el botón presionado es un operador y el último carácter también lo es, no hacer nada
      if (["+", "-", "*", "/"].includes(boton.id) && ultimoCaracterEsOperador) {
        return;
      }

      if (boton.id === "igual") {
        if (tipoOperacion === "exp") {
          try {
            // Verificar si ",e+" está presente en la pantalla
            if (
              operacionActual.includes(",e+") ||
              operacionActual.includes(",e-")
            ) {
              // Obtener el último número antes de ",e+"
              const ultimoNumero = operacion.textContent.match(
                /(\d*\.?\d+)(?=,e[\+\-])/
              );
              let numero = parseFloat(ultimoNumero[0]);
              let potencia = parseFloat(
                operacion.textContent.match(/(\d+)$/)[0]
              );

              let resultado;

              if (/([\+\-\*\/]\d*)(?=,e[\+\-])/.test(operacionActual)) {
                let NotacionC;
                let expresion = operacion.textContent.match(
                  /[\d\+\-\*\/]+(?=\d+,e[\+\-])/g
                );

                let result;

                if (/,e\+/.test(operacionActual)) {
                  if (potencia === 0) {
                    NotacionC = numero * Math.pow(10, 1);
                  } else {
                    NotacionC = numero * Math.pow(10, potencia);
                  }
                } else if (/,e\-/.test(operacionActual)) {
                  if (potencia === 0) {
                    NotacionC = numero * Math.pow(10, -1);
                  } else {
                    NotacionC = numero * Math.pow(10, -potencia);
                  }
                }

                result = expresion + NotacionC;
                resultado = eval(result);
              } else if (ultimoNumero) {
                if (/,e\+/.test(operacionActual)) {
                  if (potencia === 0) {
                    resultado = numero * Math.pow(10, 1);
                  } else {
                    resultado = numero * Math.pow(10, potencia);
                  }
                } else if (/,e\-/.test(operacionActual)) {
                  if (potencia === 0) {
                    resultado = numero * Math.pow(10, -1);
                  } else {
                    resultado = numero * Math.pow(10, -potencia);
                  }
                }
              }

              resultadoOperacion = resultado;
              resultadoAnterior = resultado;
              tipoOperacion = "";
              resultadoObtenido = false;
            }

            operacion.innerHTML = operacionActual;
            resultado.textContent = resultadoOperacion;
            agregarDivHistorial(operacionActual, resultado.textContent);
            operacionActual = "";
            resultadoOperacion = "";
            operacion.textContent = "--";
            resultado.textContent = "--";
            tipoOperacion = "";
            return;
          } catch (error) {
            resultado.textContent = "Error!";
          }
        } else if (tipoOperacion === "%") {
          try {
            operacion.innerHTML = operacionActual;
            resultado.textContent = resultadoOperacion;
            agregarDivHistorial(operacionActual, resultado.textContent);
            operacionActual = "";
            resultadoOperacion = "";
            operacion.textContent = "--";
            resultado.textContent = "--";
            tipoOperacion = "";
            return;
          } catch (error) {
            resultado.textContent = "Error!";
          }
        } else if (
          tipoOperacion === "cuadrado" ||
          tipoOperacion === "raiz" ||
          tipoOperacion === "inverso" ||
          tipoOperacion === "pi" ||
          tipoOperacion === "e" ||
          tipoOperacion === "absoluto"
        ) {
          try {
            operacion.innerHTML = operacionActual;
            resultado.textContent = resultadoOperacion;
            agregarDivHistorial(operacionActual, resultado.textContent);
            operacionActual = "";
            resultadoOperacion = "";
            operacion.textContent = "--";
            resultado.textContent = "--";
            tipoOperacion = "";
            return;
          } catch (error) {
            resultado.textContent = "Error!";
          }
        } else {
          try {
            let result;
            if (operacion.textContent.includes("/0")) {
              result = "Error al dividir por cero!";

              resultadoOperacion = result;
              resultadoAnterior = result;

              operacion.innerHTML = operacionActual;
              resultado.textContent = resultadoOperacion;
              return;
            } else {
              result = eval(operacion.textContent);
              resultadoOperacion = result;
              resultadoAnterior = result;

              operacion.innerHTML = operacionActual;
              resultado.textContent = resultadoOperacion;
              agregarDivHistorial(operacionActual, resultado.textContent);
              operacionActual = "";
              operacion.textContent = "--";
              resultado.textContent = "--";
              tipoOperacion = "";
            }
            return;
          } catch (error) {
            resultado.textContent = "Error!";
          }
        }
      } else if (boton.id === "C") {
        operacionActual = "";
        operacion.textContent = "--";
        resultado.textContent = "--";
        contador = 2;
        return;
      } else if (boton.id === "borrar") {
        if (
          operacion.textContent.length === 1 ||
          operacion.textContent === "Error!"
        ) {
          operacionActual = "";
          operacion.textContent = "--";
          return;
        } else {
          operacionActual = operacion.textContent.slice(0, -1);
        }
      } else if (boton.id === "CE") {
        operacionActual = operacion.textContent.replace(/\d+$/, "");
      } else if (boton.id === "%") {
        let valor;
        let porc;
        let result;

        if (resultadoOperacion === "") {
          valor = parseFloat(resultado.textContent);
        } else {
          valor = parseFloat(resultadoOperacion);
        }

        porc = `${valor}%`;
        result = valor / 100;
        operacion.innerHTML = porc;
        resultado.textContent = result;
        operacionActual = porc;
        resultadoOperacion = result;
        tipoOperacion = "%";
        contador = 2;
      } else if (boton.id === "1/x") {
        let valor;
        let frac;
        let result;

        if (resultadoOperacion === "") {
          valor = parseFloat(operacion.textContent);
        } else {
          valor = parseFloat(resultadoOperacion);
        }

        frac = `<sup>1</sup>&frasl;<sub>${valor}</sub>`;

        result = 1 / valor;
        operacion.innerHTML = frac;
        resultado.textContent = result;

        operacionActual = frac;
        resultadoOperacion = result;
        tipoOperacion = "inverso";
        contador = 2;
      } else if (boton.id === "cuadrado") {
        let valor;
        let opC;
        let result;

        if (resultadoOperacion === "") {
          valor = parseFloat(operacion.textContent);
        } else {
          valor = parseFloat(resultadoOperacion);
        }

        result = Math.pow(valor, 2);
        opC = `${valor}<sup>${contador}</sup>`;
        operacion.innerHTML = opC;
        resultado.textContent = result;
        operacionActual = opC;
        resultadoOperacion = result;
        tipoOperacion = "cuadrado";
        contador = 2;
      } else if (boton.id === "raiz") {
        let Valor;
        let opR;
        let result;

        if (resultadoOperacion === "") {
          Valor = parseFloat(operacion.textContent);
          opR = `<sup>${contador}</sup>&radic;${Valor}`;
        } else {
          contador *= 2;
          Valor = parseFloat(resultadoOperacion);
          opR = operacion.innerHTML.replace(
            /<sup>\d+<\/sup>/,
            `<sup>${contador}</sup>`
          );
        }

        result = Math.sqrt(Valor);
        operacion.innerHTML = opR;
        resultado.textContent = result;

        tipoOperacion = "raiz";
        operacionActual = opR;
        resultadoOperacion = result;
        contador = 2;
      } else if (boton.id === "pi") {
        let valor;
        let opP;
        let result;

        if (resultadoOperacion === "") {
          valor = parseFloat(operacion.textContent);
        } else {
          valor = parseFloat(resultadoOperacion);
        }

        if (operacionActual === "") {
          opP = `&pi;`;
          result = Math.PI;
        } else {
          if (/[\+\-\*\/]/.test(operacionActual)) {
            opP = operacion.textContent + Math.PI;
            result = eval(opP);
          } else {
            result = valor * Math.PI;
            opP = `${valor}&pi;`;
          }
        }

        operacion.innerHTML = opP;
        resultado.textContent = result;
        operacionActual = opP;
        resultadoOperacion = result;
        tipoOperacion = "pi";
        contador = 2;
      } else if (boton.id === "e") {
        let valor;
        let opP;
        let result;

        if (resultadoOperacion === "") {
          valor = parseFloat(operacion.textContent);
        } else {
          valor = parseFloat(resultadoOperacion);
        }

        if (operacionActual === "") {
          opP = `e`;
          result = Math.E;
        } else {
          if (/[\+\-\*\/]/.test(operacionActual)) {
            opP = operacion.textContent + Math.E;
            result = eval(opP);
          } else {
            result = valor * Math.E;
            opP = `${valor}e`;
          }
        }

        operacion.innerHTML = opP;
        resultado.textContent = result;
        operacionActual = opP;
        resultadoOperacion = result;
        tipoOperacion = "e";
        contador = 2;
      } else if (boton.id === "absoluto") {
        let valor;
        let opB;
        let result;

        if (resultadoOperacion === "") {
          valor = parseFloat(operacion.textContent);
        } else {
          valor = parseFloat(resultadoOperacion);
        }

        result = Math.abs(valor);
        opB = `${valor}`;

        operacion.innerHTML = opB;
        resultado.textContent = result;
        operacionActual = opB;
        resultadoOperacion = result;
        tipoOperacion = "absoluto";
        contador = 2;
      } else if (boton.id === "+/-") {
        try {
          if (
            operacion.textContent.includes(",e+") ||
            operacion.textContent.includes(",e-")
          ) {
            if (/,e\+\d+/.test(operacion.textContent)) {
              operacion.textContent = operacion.textContent.replace(
                /,e\+/,
                `,e-`
              );
            } else if (/,e\-\d+/.test(operacion.textContent)) {
              operacion.textContent = operacion.textContent.replace(
                /,e\-/,
                `,e+`
              );
            }
          } else {
            if (/\d+[\+\-]\d+/.test(operacion.textContent)) {
              let operadores = operacion.textContent.match(/[\+\-]/g); // Encuentra todos los operadores
              let ultimoOperadorIndex = operacion.textContent.lastIndexOf(
                operadores[operadores.length - 1]
              ); // Encuentra el índice del último operador
              if (operadores[operadores.length - 1] === "+") {
                operacion.textContent =
                  operacion.textContent.substring(0, ultimoOperadorIndex) +
                  "-" +
                  operacion.textContent.substring(ultimoOperadorIndex + 1);
              } else {
                operacion.textContent =
                  operacion.textContent.substring(0, ultimoOperadorIndex) +
                  "+" +
                  operacion.textContent.substring(ultimoOperadorIndex + 1);
              }
            } else if (/^\d/.test(operacion.textContent)) {
              operacion.textContent = "-" + operacion.textContent;
            } else if (/^\-\d/.test(operacion.textContent)) {
              operacion.textContent = operacion.textContent.substring(1);
            }

            resultadoAnterior = operacion.textContent;
          }

          return;
        } catch (error) {
          operacion.textContent = "Error!";
          return;
        }
      } else if (boton.id === "exp") {
        if (/\d+$/.test(operacionActual)) {
          operacionActual += `,e+0`;
          operacion.textContent = operacionActual;
          tipoOperacion = "exp";
          resultadoObtenido = false;
        }
      } else {
        if (operacion.textContent === "--") {
          operacionActual = datosmostrar;
          resultado.textContent = "--";
          resultadoOperacion = "";
        } else {
          operacionActual += datosmostrar;
        }
      }

      if (["+", "-", "*", "/"].includes(boton.id) && resultadoAnterior !== "") {
        operacionActual = resultadoAnterior + datosmostrar;
        resultadoObtenido = false;
      } else {
        resultadoAnterior = "";
        resultadoObtenido = true;
      }

      operacion.innerHTML = operacionActual;
      await Mm();
    });

    if (resultadoObtenido) {
      operacion.textContent = datosmostrar;
      resultadoAnterior = "";
      operacionActual = "";
      resultadoOperacion = "";
      resultadoObtenido = false;
    }
  });

  copy.addEventListener("click", () => {
    const textoResultado = resultado.textContent;

    const elementoTemporal = document.createElement("textarea");
    elementoTemporal.value = textoResultado;

    document.body.appendChild(elementoTemporal);

    elementoTemporal.select();
    document.execCommand("copy");

    document.body.removeChild(elementoTemporal);

    copy.innerHTML = "<i class='bx bx-check'></i>";
    copy.disabled = true;
    copy.classList.add("disabled");
  });

  document.getElementById("StoreMemory").addEventListener("click", () => {
    operacionActual = "";
    operacion.textContent = "--";
    return;
  });

  document.getElementById("recoverMemory").addEventListener("click", () => {
    if (operacionActual === "") {
      operacionActual = data;
    }
  });

  document.getElementById("AddMemory").addEventListener("click", () => {
    resultado.textContent = parseFloat(operacionActual) + data;
    operacionActual = `${operacionActual}+${data}`;
    agregarDivHistorial(operacionActual, resultado.textContent);
    operacionActual = "";
    operacion.textContent = "--";
    resultado.textContent = "--";
    return;
  });

  document.getElementById("subtractMemory").addEventListener("click", () => {
    resultado.textContent = parseFloat(operacionActual) - data;
    operacionActual = `${operacionActual}-${data}`;
    agregarDivHistorial(operacionActual, resultado.textContent);
    operacionActual = "";
    operacion.textContent = "--";
    resultado.textContent = "--";
    return;
  });

  const btnli = document.querySelectorAll(".btn");

  btnli.forEach((boton) => {
    boton.addEventListener("click", () => {
      if (boton.id === "Estandar") {
        operacionActual = "";
        resultadoOperacion = "";
        operacion.textContent = "--";
        resultado.textContent = "--";
        tipoOperacion = "";
        contador = 2;
        resultadoAnterior = "";
      } else if (boton.id === "Cientifica") {
        operacionActual = "";
        resultadoOperacion = "";
        operacion.textContent = "--";
        resultado.textContent = "--";
        tipoOperacion = "";
        contador = 2;
        resultadoAnterior = "";
      }
    });
  });
}
