import axios from "./axios";

export const createPreferenceRequest = (planData) => 
    axios.post("/payments/create-preference", planData);