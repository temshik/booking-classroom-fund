import axios from "axios";

export default class AxiosServices {
    post(url,data) {
        return axios.post(url, data)
    }
    put(url,data){
        return axios.put(url, data)
    }
}
