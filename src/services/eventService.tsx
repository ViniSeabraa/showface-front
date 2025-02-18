import api from './api';

interface EventPayload {
  id: number;
}
  
export const getEventService = async (payload: EventPayload) => {
    const response = await api.get('/event', payload);
    return response.data; 
};

//