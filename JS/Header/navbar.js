export function navbar() {
    const options = document.querySelectorAll(".typeC");
    const toggleSwitch = document.getElementById('toggle');
    const mainElement = document.querySelector('main');

    options.forEach((option) => {
      const submenu = option.querySelector("ul");
  
      option.addEventListener("click", () => {
        if (submenu) {
          if (submenu.style.maxHeight === "0px" || !submenu.style.maxHeight) {
            submenu.style.maxHeight = submenu.scrollHeight + "px";
          } else {
            submenu.style.maxHeight = 0;
          }
        }
  
        options.forEach((opt) => {
          if (opt !== option) {
            const sub = opt.querySelector("ul");
            opt.classList.remove("active");
            if (sub) {
              sub.style.maxHeight = 0;
            }
          }
        });
        option.classList.add("active");
      });
  
      if (submenu) {
        submenu.addEventListener("click", (event) => {
          event.stopPropagation();
        });
      }
    });

    toggleSwitch.addEventListener('change', function() {
      if (this.checked) {
        mainElement.classList.add('dark');
      } else {
        mainElement.classList.remove('dark');
      }
  });
}
