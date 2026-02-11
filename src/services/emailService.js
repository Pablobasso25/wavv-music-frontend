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
    try {
     const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
     );
     return response;
    } catch (error) {
    console.error("Error en EmailJS:", error);
    throw error;
    }
};
const TEMPLATE_GENERICO = import.meta.env.VITE_EMAILJS_TEMPLATE_GENERICO;

const sendNotification = async (data) => {
    const params = {
        to_name: data.username,
        to_email: data.email,
        dynamic_issue: data.dynamic_issue,
        body_message: data.body_message,
        from_name: "Wavv Music",
    }
    return await emailjs.send(SERVICE_ID, TEMPLATE_GENERICO, params);
}
