export const validatePassword = (password, username) => {
  if (!password) return { force: 0, validations: {} };

  const validations = {
    longitud: password.length >= 8,
    mayuscula: /[A-Z]/.test(password),
    minuscula: /[a-z]/.test(password),
    numero: /\d/.test(password),
    simbolo: /[!@#$%^&*(),.?":{}|_/]/.test(password),
    noEspacios: !/\s/.test(password),
    diferenteAlUsername: password !== username,
    noCaracteresPeligrosos: !/[<>]/.test(password),
    noPalabrasComunes: !/(password|123456|admin|qwerty)/i.test(password),
  };
  let force = Math.min(password.length * 4, 32);
  if (validations.longitud) force += 10;
  if (validations.mayuscula) force += 10;
  if (validations.minuscula) force += 10;
  if (validations.numero) force += 10;
  if (validations.simbolo) force += 18;
  if (validations.noEspacios) force += 5;
  if (validations.diferenteAlUsername) force += 5;

  return { force: Math.min(force, 100), validations };
};
  export const getForceConfig = (force) => {
  if (force === 0) return { texto: "No ingresado", variant: "secondary" };
  if (force < 50) return { texto: "Débil", variant: "danger" };
  if (force < 80) return { texto: "Regular", variant: "warning" };
  if (force < 99) return { texto: "Buena", variant: "info" };
  return { texto: "Segura", variant: "success" };
};
