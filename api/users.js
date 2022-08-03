const API_URL = 'https://randomuser.me/api';
import { getErrorMessage } from '../components/Error';

export const fetchUsers = async (results, page = 1) => {
  const url = `${API_URL}/?results=${results}&page=${page}`;

  try {
    const response = await fetch(url);
    console.log(response);
    return response.json();
  } catch (error) {
    console.log(error);
    const element = document.querySelector('.slides-container');
    element.innerHTML = getErrorMessage();
  }
};
