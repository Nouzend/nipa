import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/tickets';

export const createTicket = (ticket) => axios.post(API_URL, ticket);
export const updateTicket = (id, ticket) => axios.put(`${API_URL}/${id}`, ticket);
export const getTickets = (status, sortBy) => {
  let url = API_URL;
  const params = [];
  if (status) {
    params.push(`status=${status}`);
  }
  if (sortBy) {
    params.push(`sortBy=${sortBy}`);
  }
  if (params.length) {
    url += `?${params.join('&')}`;
  }
  return axios.get(url);
};
export const getTicketById = (id) => axios.get(`${API_URL}/${id}`);
