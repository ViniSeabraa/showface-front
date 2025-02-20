import api from './api';

interface FindPayload {
    id: number,
    file: File | null
}

interface CreateEventPayload {
    name: string,
    photographer: string,
    photographerLink: string,
    userId: string,
    userName: string,
    file: File | null
}

interface EditEventPayload {
    id: number,
    name: string,
    photographer: string,
    photographerLink: string
}

export const findService = async (payload: FindPayload) => {
    const response = await api.post('/find/', payload, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    return response.data;
};

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