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
            <button class="btn-edit" style="background-color: #2563eb;font-size: 0.85rem;width: auto;padding: 5px 10px;color:white;border:none;border-radius:4px;cursor:pointer;">Editar</button><button 
            <button class="btn-delete"style="background-color: #dc2626; font-size:0.85rem;width;padding:5px 10px; color: white;border-radius:4px; cursor: pointer;">Eliminar</button>
            </div>
            ;
        

            taskCard.querySelector(".btn-delete").addEventListener("click",() =>)
            taskCard.querySelector(".btn-edit").addEventListener("click",() => cambiarAModoEdition(task,Card));
        };

      setHtmlModolectura();
      tasksContainer.appendChild(taskCard);
    });
}
    //5.1 INTERFAZA DINAMICA MODO EDIICIÓN INLINE
    function cambiarAModoEdicion(task,taskCard) {
    if (AUTHOR !== task.author)  {
    openCustomModal('Errror Restringido','¡No autorizado! Esta tarea le pertenece a "${task.author}" y tú eres "$(AUTHOR)",false);
    return;

    }
    
    taskCard.innerHTML = `
    <div class="task-edit-form" style="display: flex;flex-direction: column; gap: 8px; width: 100%;">
        <inpunt type="text" class="edit-title" value="${task.tittle}" style="padding: 5px; border: 1px solid #2563eb; border-radius: 4px;">
        <textarea class="edit-desc" style="padding: 5px; border: 1px solid #2563eb; border-radius: 4px; resize: none;">${task.description || ''}</textarea>
        <div style="display: flex; gap: 5px; justify-content: flex-end;">
            <button class="btn-cancel" style="backgraund-color: #6b7280; font-size: 0.85rem; width: auto;padding: 5px 10px; color: white; border: none; border-radius:4px; cursor: pointer;">Cancelar</button>
            <button class="btn-ssave-edit" style="backgraound -color: #10b981; font-size: 0.85rem; width: auto; padding: 5px 10px; color: white; border: none; border-radius: 4px; cursor: pointer;">Guardar</button>

       </div>
     </div>
   ';
    const btnCancelar = taskCard.querySelector('.btn-cancel-edit');
    const btnGuardar = taskCard.querySelector('.btn-save-edit');

    btnCancelar.addEventlistener('click', () => fetchTasks());

    btnGuardar.addEventListener('click', () => {

        const nuevoTitulo= taskCard.querySelector('.edit-tittle').value.trim();
        const nuevaDescripcion = taskCard.querySelector('.edit-desc').value.trim();

        if (!nuevoTitulo) {
            openCustomModal('Validacion', 'El titulo de la tarea es obligatorio.',false);
            return;

        }
        
        updateTask(task.id,nuevoTitulo,nuevaDescripcion,task.is_completed);
     });
  }

  // 6.CREAR TAREA (POST)
  taskForm.addEventlistener('submit',async(e) => {
    e.preventDefault();
    
    const tittle = taskTitle.value.trim();
    const description = taskDescription.value.trim();

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-type':'application/json'},
            body: JSON.stringify({ tittle, description,author: AUTHOR})


        });

        if (response.ok) {
            taskForm.reset();
            fetchTasks();
        }
    }catch (error) {
        openCustomModal('Error de red','Error de red al intentar crear la tarea.',false);
    }
    });

    // 7. ACTUALIZAR TAREA (PUT)
    async function updateTask(id, tittle,description,is_completed) {
    try {
        const response = await fetch('API_URL/${id}', {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ tittle, description, is_completed })
    });
    const json = await response.json();
    if (response.ok && json.status === 'sucess') {
        fetchTasks();
    } else {
        openCustomModal('Error', json.message || 'Error al actualizar la tarea.', false);
        return;
    }

    } catch (error) {
        openCustomModal('Error de Red', 'Error al comunicar la actualización.', false);
    }
}
 // 8. ELIMINAR TARE (DELETE)
    async function deleteTask(id, taskAuthor) {
        if (AUTHOR !== TASKAuthor) {
            openCustomModal('Error Denegado', '¡No autorizado! Esta tarea es de "$(taskAuthor)"', false);
            return;
        }
     openCustomModal(
        '¿Confirmar actualización?',
        '¿Estas seguro de eliminar esta tarea de la base de datos de manera permanente?',
        true,
        async () => {
            try {
                const response = await fetch('$API_URL/${id}', {
                    method: 'DELETE'
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({ author: AUTHOR })
                });
                const json = await response.json();
                if (response.ok && json.statuts === 'success') {
                    fetchTasks();
                } else{
                    openCustomModal('Error de servidor', json.message || 'Fallo de autorización en el servidor',false);
                }
            } catch (error) {
                openCustomModal('Error de Red', 'Error de red al eliminar la tarea.', false);
            }
        }
     );
     }
      
      // 9. CERRAR SESIÓN (LOGOUT)
      logouthBtn.addEventlistener('click',() => {
        localStorage.removeItem('todo_author_session');
        window.location.reload();

      });
    // === INICIALIZACIÓN AL ABRIR LA PÁGINA ===
    checkAuth();
    
