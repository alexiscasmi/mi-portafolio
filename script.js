let menuVisible = false;
let animacionesAplicadas = false;
//Función que oculta o muestra el menu
function mostrarOcultarMenu(){
    if(menuVisible){
        document.getElementById("nav").classList ="";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList ="responsive";
        menuVisible = true;
    }
}

function seleccionar(){
    //oculto el menú una vez que selecciono una opcion
    document.getElementById("nav").classList ="";
    menuVisible = false;
}

function scrollSuaveA(id){
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
}

function activarSkills(){
    // Esperamos que el scroll automático al ancla termine
    setTimeout(() => {
        requestAnimationFrame(() => {
            efectoHabilidades();
        });
    }, 500); // Aumenta el tiempo si notas que no da tiempo a llegar a #skills
}

//Función que aplica las animaciones de las habilidades
function efectoHabilidades(){
    const skills = document.getElementById("skills");
    const distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;

    if(distancia_skills >= 300){
        const habilidades = document.getElementsByClassName("progreso");

        // Limpiar clases previas para reiniciar animaciones
        const clases = [
            "javascript", "htmlcss", "photoshop", "wordpress", "drupal",
            "comunicacion", "trabajo", "creatividad", "dedicacion", "proyect"
        ];

        for(let i = 0; i < habilidades.length; i++){
            habilidades[i].className = "progreso"; // resetear
        }

        // Forzar reflujo (hack para reiniciar animación)
        void habilidades[0].offsetWidth;

        // Agregar clases animadas
        habilidades[0].classList.add("javascript");
        habilidades[1].classList.add("htmlcss");
        habilidades[2].classList.add("photoshop");
        habilidades[3].classList.add("wordpress");
        habilidades[4].classList.add("drupal");
        habilidades[5].classList.add("comunicacion");
        habilidades[6].classList.add("trabajo");
        habilidades[7].classList.add("creatividad");
        habilidades[8].classList.add("dedicacion");
        habilidades[9].classList.add("proyect");
    }
}

//  Esta función realiza scroll suave Y activa la animación después
function scrollYAnimar(id) {
    const target = document.querySelector(id);
    target.scrollIntoView({ behavior: "smooth" });

    // Esperamos un poco a que termine el scroll y aplicamos la animación
    setTimeout(() => {
        efectoHabilidades();
    }, 600); // Puedes ajustar el tiempo si hace scroll muy lento o muy rápido
}

//detecto el scrolling para aplicar la animación de la barra de habilidades 
window.onscroll = function(){
    efectoHabilidades();
}