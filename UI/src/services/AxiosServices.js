//import axios from "axios";
import axios from "../utils/axios"

export default class AxiosServices {
    post(url,data) {
        return axios.post(url, data)
    }
    put(url,data){
        return axios.put(url, data)
    }
    get(url, config){
        return axios.get(url, config)
    }
}