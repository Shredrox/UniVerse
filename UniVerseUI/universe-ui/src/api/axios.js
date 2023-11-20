import axios from "axios";

const BASE_URL = 'https://localhost:7115/api/';

export default axios.create({
    baseURL: BASE_URL
});
