import Swal from "sweetalert2";
import { toast } from "react-toastify";

const swalConfig = {
  background: "#1a1a1a",
  color: "#f5f5f5",
  confirmButtonColor: "#5773ff",
  cancelButtonColor: "#ff2e2e",
};

export const showSuccess = (message, title = "¡Éxito!") => {
  return Swal.fire({
    ...swalConfig,
    icon: "success",
    title,
    text: message,
    confirmButtonText: "OK",
  });
};

export const showError = (message, title = "Error") => {
  return Swal.fire({
    ...swalConfig,
    icon: "error",
    title,
    text: message,
    confirmButtonText: "OK",
  });
};

export const showWarning = (message, title = "Advertencia") => {
  return Swal.fire({
    ...swalConfig,
    icon: "warning",
    title,
    text: message,
    confirmButtonText: "Entendido",
  });
};

export const showConfirm = (message, title = "¿Estás seguro?") => {
  return Swal.fire({
    ...swalConfig,
    icon: "question",
    title,
    text: message,
    showCancelButton: true,
    confirmButtonText: "Sí, continuar",
    cancelButtonText: "Cancelar",
  });
};

export const toastSuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
  });
};

export const toastError = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
  });
};

export const toastWarning = (message) => {
  toast.warning(message, {
    position: "top-right",
    autoClose: 3000,
  });
};

export const toastInfo = (message) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 3000,
  });
};

export const showPremiumAlert = (navigate, image) => {
  return Swal.fire({
    width: "500px",
    padding: "0",
    background: "#181818",
    html: `
                  <div style="padding: 15px;">
                    <img src="${image}" style="width: 100%; border-radius: 15px; display: block;" />
                  </div>
            
                  <div style=" text-align: center; font-family: 'Circular', sans-serif;">
                    <h2 style="color: #7e7d7d; font-size: 1.8rem; font-weight: 700; margin-bottom: 10px;">
                      ¡Alcanzaste el límite!
                    </h2>
                    <p style="color: #b3b3b3; font-size: 1.1rem; line-height: 1.5; margin-bottom: 25px;">
                      Tu playlist gratuita tiene un máximo de <span style="color: #a855f7; font-weight: bold;">5 canciones</span>. 
                      Pasate a <span style="color: #a855f7; font-weight: bold;">Premium</span> para armar colecciones infinitas.
                    </p>
                  </div>
                `,
    showConfirmButton: true,
    confirmButtonText: "VER PLANES PREMIUM",
    confirmButtonColor: "#a855f7",
    showCancelButton: true,
    cancelButtonText: "Seguir en el plan gratuito",
    cancelButtonColor: "transparent",
    allowOutsideClick: false,
    allowEscapeKey: false,
    customClass: {
      popup: "my-swal-popup",
      confirmButton: "my-swal-confirm-premium",
    },
    didOpen: () => {
      const container = Swal.getContainer();
      if (container) container.style.zIndex = "30000";

      const cancelBtn = Swal.getCancelButton();
      cancelBtn.style.textDecoration = "underline";
      cancelBtn.style.color = "#b3b3b3";
      cancelBtn.style.fontSize = "0.9rem";
      cancelBtn.style.boxShadow = "none";
    },
  }).then((res) => {
    if (res.isConfirmed) navigate("/subscription");
  });
};

export const showPremiumAlert2 = (image) => {
  return Swal.fire({
    width: "500px",
    padding: "0",
    background: "#181818",
    html: `
      <div style="padding: 15px;">
        <img src="${image} " style="width: 100%; border-radius: 15px; display: block;" />
      </div>

      <div style=" text-align: center; font-family: 'Circular', sans-serif;">
        <h2 style="color: #7e7d7d; font-size: 1.8rem; font-weight: 700; margin-bottom: 10px;">
          ¡Disfrutá sin límites!
        </h2>
        <p style="color: #b3b3b3; font-size: 1.1rem; line-height: 1.5; margin-bottom: 25px;">
          Llegaste al límite de la versión gratuita. Pasate a <span style="color: #a855f7; font-weight: bold;">Premium</span> para escuchar todas las canciones que quieras, sin interrupciones.
        </p>
      </div>
    `,
    showConfirmButton: true,
    confirmButtonText: "DESCUBRIR PREMIUM",
    confirmButtonColor: "#a855f7",
    showCancelButton: true,
    cancelButtonText: "Seguir con anuncios",
    cancelButtonColor: "transparent",
    timer: 10000,
    timerProgressBar: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
    customClass: {
      popup: "my-swal-popup",
      confirmButton: "my-swal-confirm",
      cancelButton: "my-swal-cancel",
    },
    didOpen: () => {
      const container = Swal.getContainer();
      if (container) container.style.zIndex = "30000";

      const cancelBtn = Swal.getCancelButton();
      cancelBtn.style.textDecoration = "underline";
      cancelBtn.style.color = "#b3b3b3";
      cancelBtn.style.fontSize = "0.9rem";
    },
  });
};
