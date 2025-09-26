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
            "javascript", "htmlcss", "python", "wordpress", "powerbi",
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
        habilidades[2].classList.add("python");
        habilidades[3].classList.add("wordpress");
        habilidades[4].classList.add("powerbi");
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


/* ---------------------------
   FORMULARIO DE CONTACTO
   CON SUPABASE
---------------------------- */

// Configuración de Supabase
const SUPABASE_URL = "https://svhwmdqjguibtqaviwgc.supabase.co";   
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2aHdtZHFqZ3VpYnRxYXZpd2djIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5MTk3NTYsImV4cCI6MjA3NDQ5NTc1Nn0.SiMSY69l5LDEObIJVIZmHGI4IiKvCdsbXoqIdwtW4rM";          

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Capturar formulario
const form = document.getElementById("contactForm");
const status = document.getElementById("status");

if(form){
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const telefono = document.getElementById("telefono").value;
        const correo = document.getElementById("correo").value;
        const tema = document.getElementById("tema").value;
        const mensaje = document.getElementById("mensaje").value;

        // Insertar en Supabase
        const { error } = await supabaseClient
            .from("contactos")  // 👈 tu tabla en Supabase
            .insert([{ nombre, telefono, correo, tema, mensaje }]);

        if (error) {
            console.error(error);
            status.innerText = "❌ Error al enviar el mensaje.";
            status.style.color = "red";
        } else {
            status.innerText = "✅ Mensaje enviado correctamente.";
            status.style.color = "green";
            form.reset();
        }
    });
}