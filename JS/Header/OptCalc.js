export function OptCalc() {
  const li = document.querySelectorAll(".opt li");
  const btn = document.querySelectorAll(".btn");
  const estandarC = document.querySelector("#CalculadoraEstandar");
  const cientificaC = document.querySelector("#CalculadoraCientifica");

  btn.forEach((boton) => {
    boton.addEventListener("click", () => {
      // Remover la clase "active" de todos los elementos li
      li.forEach((lista) => {
        lista.classList.remove("active");
      });

      if (boton.id === "Estandar") {
        estandarC.style.display = "block";
        cientificaC.style.display = "none";
      } else if (boton.id === "Cientifica") {
        estandarC.style.display = "none";
        cientificaC.style.display = "block";
      }

      // Agregar la clase "active" al elemento li correspondiente al botón clickeado
      const liPadre = boton.parentElement; // El li que contiene el botón clickeado
      liPadre.classList.add("active");
    });
  });
}
