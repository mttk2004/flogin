import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

export const login = async (username: string, password: string): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw new Error('Đã xảy ra lỗi không xác định');
  }
};
