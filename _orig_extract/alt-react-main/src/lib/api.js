import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchTodos = async (page = 1) => {
  const limit = 10;
  const response = await axios.get(`${BASE_URL}/todos?_page=${page}&_limit=${limit}`);
  return response.data;
};

export const fetchTodoById = async (id) => {
  const response = await axios.get(`${BASE_URL}/todos/${id}`);
  return response.data;
};
