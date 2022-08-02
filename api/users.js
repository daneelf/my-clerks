const API_URL = 'https://randomuser.me/api';

export const fetchUsers = async (results, page = 1) => {
  console.log(page);
  const url = `${API_URL}/?results=${results}&page=${page}`;
  try {
    const response = await fetch(url);
    console.log(response);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
