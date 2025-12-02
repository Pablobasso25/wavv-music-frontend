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
