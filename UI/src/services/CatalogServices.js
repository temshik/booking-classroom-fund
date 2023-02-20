import AxiosServices from "./AxiosServices";
import Configuration from "../configurations/Configuration";

const axiosService = new AxiosServices();

export default class CatalogServices {
    GetCategories(config){
        return axiosService.get(Configuration.GetCategories, config)
    }
}