export const LOGIN_LIMITS = {
  email: { min: 5, max: 50 },
  password: { min: 8, max: 20 }
};

export const validateLogin = (formData) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!formData.email) {
    errors.email = "El correo es obligatorio";
  } else if (!emailRegex.test(formData.email)) {
    errors.email = "Formato de correo inválido";
  } else if (formData.email.length < LOGIN_LIMITS.email.min) {
    errors.email = `El correo debe tener al menos ${LOGIN_LIMITS.email.min} caracteres`;
  }
  if (!formData.password) {
    errors.password = "La contraseña es obligatoria";
  } else if (formData.password.length < LOGIN_LIMITS.password.min) {
    errors.password = `La contraseña debe tener al menos ${LOGIN_LIMITS.password.min} caracteres`;
  }

  return errors;
};