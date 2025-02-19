import api from './api';

interface CreateEventPayload {
    name: string,
    photographer: string,
    photographerLink: string,
    userId: number,
    userName: string
}

interface EditEventPayload {
    id: number,
    name: string,
    photographer: string,
    photographerLink: string
}


export const getEventService = async (id: number) => {
    const response = await api.get(`/event/${id}`);
    return response.data; 
};

export const createEventService = async (payload: CreateEventPayload) => {
    const response = await api.post('/event/new', payload);
    return response.data; 
};

export const editEventService = async (payload: EditEventPayload) => {
    const response = await api.post('/event/edit', payload);
    return response.data; 
};