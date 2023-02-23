import AxiosServices from "./AxiosServices";
import Configuration from "../configurations/Configuration";

const axiosService = new AxiosServices();

export default class CatalogServices {

    GetCategories(){
        return axiosService.get(Configuration.GetCategories)
    }
    GetWorkspaciesPaged(PageSize,CurrentPage,SortOn,SortDirection){
        return axiosService.get(Configuration.GetWorkspaciesPaged+`?PageSize=${PageSize}&CurrentPage=${CurrentPage}&SortOn=${SortOn}&SortDirection=${SortDirection}`)
    }
}
