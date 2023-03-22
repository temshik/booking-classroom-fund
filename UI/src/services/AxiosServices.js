import axios from "../utils/axios"

export default class AxiosServices {
    post(url,data) {
        return axios.post(url, data)
    }
    put(url,data){
        return axios.put(url, data)
    }
    get(url){
        return axios.get(url)
    }
    delete(url,data){
        return axios.delete(url,data)
    }
}
