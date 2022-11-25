import axios from 'axios';

const urlApi = process.env.VUE_APP_URL_API_TAGS;

const httpAxiosApiTags = axios.create({
    baseURL: urlApi,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

export default httpAxiosApiTags
