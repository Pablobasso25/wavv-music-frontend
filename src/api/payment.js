import axios from "./axios";

export const createPreferenceRequest = (planData) => 
    axios.post("/payments/create-preference", planData);

export const getPayments = (page = 1, limit = 10) => {
    return axios.get('/payments', {
        params: {
            page,
            limit
        },
        headers: {
            Authorization:` Bearer ${localStorage.getItem('token')}`
        }
    });
};

export const getPlansRequest = () => axios.get("/plans");

export const updatePlanRequest = (id, planData) => axios.put(`/plans/${id}`, planData);