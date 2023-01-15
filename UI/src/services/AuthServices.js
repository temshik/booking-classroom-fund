import AxiosServices from "./AxiosServices";
import Configuration from "../configurations/Configuration";

const axiosService = new AxiosServices();

export default class AuthServices {
    SignUp(data){
        return axiosService.post(Configuration.SignUp+"$/{data}", data)
    }
    SignIn(data){
        return axiosService.post(Configuration.SignIn, data)
    }

}