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
};  