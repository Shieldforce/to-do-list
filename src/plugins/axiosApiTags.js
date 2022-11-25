import axios from 'axios';
import store from "@/store";

const urlApi = store.state.credentials.api_tags.url;

const httpAxiosApiTags = axios.create({
    baseURL: urlApi,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default httpAxiosApiTags;