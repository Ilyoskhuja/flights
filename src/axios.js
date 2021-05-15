// axios
import axios from 'axios'

const baseURL = ""

// axios.defaults.headers.common['Authorization'] = `${localStorage.getItem('accessToken')}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';
export default axios.create({
  baseURL:process.env.VUE_APP_ENV == 'development' ? process.env.VUE_APP_URL : 'http://' + window.location.hostname 
})
