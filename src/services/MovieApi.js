import axios from 'axios'
import authHeader from './auth-header';

const API_URL = process.env.VUE_APP_API_URL + '/movies';
const API_URL_DISKSPACE = 'https://radarr.meelsnet.nl/api/diskspace?apikey=c7ceb5496f2a40b3ac4787fc468ec6f9'
const API_URL_SYSTEM_STATUS = 'https://radarr.meelsnet.nl/api/system/status?apikey=c7ceb5496f2a40b3ac4787fc468ec6f9'

class MovieService {

  fetchMovieCollection() {
    return axios.get(API_URL, { headers: authHeader() })
      .then(response => {
        return response.data
      })
  }

  fetchDiskSpace() {
    return axios.get(API_URL_DISKSPACE)
      .then(response => {
        return response.data
      })
  }

  fetchSystemStatus() {
    return axios.get(API_URL_SYSTEM_STATUS)
    .then(response => {
      return response.data
    })
  }

  fetchSingleMovie(id) {
    return axios.get(API_URL + '/' + id, { headers: authHeader() })
      .then(response => {
        return response.data
      })
  }
}

export default new MovieService();