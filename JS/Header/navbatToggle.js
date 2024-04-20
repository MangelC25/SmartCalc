function NavResposive() {
    const NavToggle = document.querySelector("#menu");
  
    NavToggle.addEventListener("click", () => {
      const nav = document.querySelector("#headernavbar");
      NavToggle.classList.toggle("active");
      

      if (nav.style.maxHeight === "0px" || !nav.style.maxHeight) {
        nav.style.display = "block";
        NavToggle.innerHTML = "<i class='bx bx-x' ></i>"
        setTimeout(() => {
          nav.style.maxHeight = "500px";
        }, 0); // Establecer el max-height basado en la altura total del contenido
      } else {
        NavToggle.innerHTML = "<i class='bx bx-menu'></i>"
        setTimeout(() => {
          nav.style.maxHeight = null;
        }, 0);
        
      }
    });
  }
  
  export default NavResposive;