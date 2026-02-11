import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

emailjs.init(PUBLIC_KEY);

export const sendWelcomeEmail = async (username, email) => {
    const templateParams = {
        to_name: username,
        to_email: email,
        from_name: "Wavv Music",
        date: new Date().toLocaleDateString(),
    }
}