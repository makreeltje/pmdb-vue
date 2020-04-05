import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/test';

class UserService {
  getPublicContent() {
    return axios.get(process.env.VUE_APP_API_DOMAIN + API_URL + '/all');
  }

  getUserBoard() {
    return axios.get(process.env.VUE_APP_API_DOMAIN + API_URL + '/user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(process.env.VUE_APP_API_DOMAIN + API_URL + '/mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(process.env.VUE_APP_API_DOMAIN + API_URL + '/admin', { headers: authHeader() });
  }
}

export default new UserService();