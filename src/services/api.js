import axios from 'axios';

const API_BASE = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = async () => {
  try {
    return await axios.get(API_BASE);
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const addUser = async (user) => {
  try {
    return await axios.post(API_BASE, user);
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

export const editUser = async (id, user) => {
  try {
    return await axios.put(`${API_BASE}/${id}`, user);
  } catch (error) {
    console.error('Error editing user:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    return await axios.delete(`${API_BASE}/${id}`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
