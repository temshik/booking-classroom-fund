import AxiosServices from "./AxiosServices";
import Configuration from "../configurations/Configuration";

const axiosService = new AxiosServices();

export default class CatalogServices {

    GetCategories(){
        return axiosService.get(Configuration.GetCategories)
    }
    EditWorkspace(){

    }
}
