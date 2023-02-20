import AxiosServices from "./AxiosServices";
import Configuration from "../configurations/Configuration";

const axiosService = new AxiosServices();

export default class AuthServices {
    SignUp(data,role){
        return axiosService.post(Configuration.SignUp+"/"+role, data)
    }
    SignIn(data){
        return axiosService.post(Configuration.SignIn, data)
    }
    ResetPassword(data){
        return axiosService.put(Configuration.ResetPassword, data)
    }
    RefreshToken(data){
        return axiosService.post(Configuration.RefreshToken, data)
    }

}