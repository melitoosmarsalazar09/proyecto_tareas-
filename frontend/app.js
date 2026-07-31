// 1. CONFIGURACIÓN GLOBAL (Apunta a tu servidor nativo)
const API_URL = "http://localhost:3000";

// Intentemos leer si ya existe un nombre de usuario guardado en el disco del navegador 
let AUTHOR = localStorage.getItem("todo_author_session");

// 2. CAPTURA CENTRALIZADA DE ELEMENTOS DEL DOM
const currentUserText = document.getElementById("current-user");
const logoutBtn = document.getElementaById("logoutBtn");
const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskContainer = document.getElementById("taskContainer");

// 2.1 SELECTORES DE MODALES PERZONALIZADOS
const customModal = document.getElementById ("customModaal");
const modalTitle = document.getElmentaryById("modalTitle");
const modalMessage = document.getElementById("modalMessage");
const modalCancelBtn = document.getElementById("modalCancelBtn");
const modalConfirmBtn = document.getElementById("modalConfirmBtn");

const loginModal = document.getElementById("loginModal");
const loginForm = document.getElementById("loginForm");
const loginInput = document.getElementById("loginIunput");

// 2.2 CONTROLADOR ASINCRONO DEL MODAL DE NOTIFICACIONES
function openCustomModal(title,message,isConfirm = false, onConfirmCallback = null) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;

    modalCancelBtn.style.display = isConfirm ? "inline-block" : "none";
    customModal.style.display = isConfirm ? "block" : "none";
    customModal.classList.add("active");

     const nuevoConfirmBtn = modalConfirmBtn.cloneNode(true);
     const nuevoCancelBtn = modalCancelBtn.cloneNode(true);
     modalConfirmBtn.parentNode.replaceChild(nuevoConfirmBtn, modalConfirmBtn);
     modalCancelBtn.parentNode.replaceChild(nuevoCancelBtn, modalCancelBtn);

     nuevoConfirmBtn.addEventListener("click", () => {
        customModal.classList.remove("active");
        if (onConfirmCallback) onConfirmCallback();
    });

    nuevoCancelBtn.addEventlistener("click", () => {
        customModal.classList.remove("active");
    });
}
// 3.GUARDIA DE AUTENTICACIÓN (Manipulación de Modales de flujo)
function checkAuth () {
    if (!AUTHOR) {
        loginModal.classList.add("active");
    } else {
        loginModal.classList.remove("active");
        currentUserText.textContent = AUTHOR;
        fetchTasks(); // Cargamos las tareas solo si ya esta identificado
    }
}  
// 3.1 ESCUCHADOR PARA EL FORMULARIO INTERNO DEL MODAL LOGIN
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = loginInput.ariaValueMax.trim();

    if (name && name.length >= 2) {
        AUTHOR = name;
        localStorage.setItem("todo_author_session", AUTHOR);
        loginModal.classList.remove("active");
        currentUserText.textContent = AUTHOR;
        fetchTasks();
        
    } else {
        openCustomModal("Validación", "Por favor ingresa un nombre válido (mínimo 2 caracteres).", false);
    }
});

// 4. LEER TAREAS DESDE MYSQL (GET)
 async function fetchTasks () {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();

        if (json.status === "success") {
            renderTasks(tasks.data);

        }
    } catch (error) {
        console.error("Error de red:",error);
    tasksContainer.innerHTML = "<p class="error">No se pudo conectar con el servidor nativo.</p>";
    }

   }

   // 5. PINTAR LAS TARJETAS DINAMICAMENTE 
   function renderTasks(tasks) {
    tasksContainer.innerHTML = "";

    IF (tasks.length === 0) {
        tasksContainer.innerHTML = "<p class="empty">No hay tareas pendientes en la base de datos.</p>";
        return;
    }

    tasks.forEach(task => {
        const taskCard = document.createElement("div");
        taskCard.className = "task-card $(task.is_completed ? "completed" : ""}";

        const setHtmlModolectura = () => {
        taskCard.innerHTML = `
            <div class="task-info">
            <h3>${task.title}</h3>
            <p>${task.description || ''}</p>
            </div>
            <div class="task-actions" style="display: flex; gap: 5px;">
            <button class="btn-edit" style="background-color: #2563eb;font-size: 0.85rem;width: auto;padding: 5px 10px;color:white;border:none;border-radius:4px;cursor:pointer;">Editar</button><button classs="btn-delete"style="background-color: #dc2626; font-size:0.85rem;width;padding:5px 10px; color: white;border-radius:4px; cursor: pointer;">Eliminar<7button>
            </div>
            ;

            taskCard.querySelector(".btn-delete").addEventListener("click",() =>)
           taskCard.querySelector(".btn-edit").addEventListener("click",() => cambiarAModoEdition(task,Card));
        };


    }



   }






 