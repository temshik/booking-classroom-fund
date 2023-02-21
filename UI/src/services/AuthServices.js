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
    UpdatePassword(data){
        return axiosService.put(Configuration.UpdatePassword, data)
    }
    ResetPassword(data){
        return axiosService.put(Configuration.ResetPassword, data)
    }
    RefreshToken(data){
        return axiosService.post(Configuration.RefreshToken, data)
    }
    GetUser(id){
        return axiosService.get(Configuration.GetUser+"/"+id)
    }
    GetUserByEmail(data){
        return axiosService.post(Configuration.GetUserByEmail,data)
    }
    UpdateUser(data){
        return axiosService.put(Configuration.UpdateUser, data)
    }
    DeleteUser(data){
        return axiosService.delete(Configuration.DeleteUser, data)
    }
}