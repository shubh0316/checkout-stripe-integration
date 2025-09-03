import axios from "axios";

const API = axios.create({
  baseURL: "/api/forms",
});

// CREATE form
export const createForm = (data: any) => API.post("/", data);

// GET all forms
export const getForms = () => API.get("/");

// UPDATE form
export const updateForm = (id: string, data: any) => API.patch("/", { id, ...data });

// GET form by ID
export const getFormById = (id: string) => API.get(`/${id}`);
