import api from './api';

interface CreateEventPayload {
    name: string,
    photographer: string,
    photographerLink: string,
    userId: number,
    userName: string,
    file: File | null
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

export const getEventsByUserIdService = async (userId: string) => {
    const response = await api.get(`/user/${userId}`); 
    return response.data;
};

export const createEventService = async (payload: CreateEventPayload) => {
    const response = await api.post('/event/new', payload, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    return response.data; 
};

export const editEventService = async (payload: EditEventPayload) => {
    const response = await api.post('/event/edit', payload);
    return response.data; 
};