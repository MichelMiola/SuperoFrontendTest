import axios, {AxiosRequestConfig, AxiosResponse} from "axios";

export class Fetch {

    public static doGet(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<any>> {
        return axios.get(url, config).then((response: AxiosResponse) => {
            return response.data;
        });
    }

    public static doDelete(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<any>> {
        return axios.delete(url, config);
    }

    public static doPost(url: string, payload: any): Promise<AxiosResponse<any>> {
        return axios.post(url, payload);
    }

    public static doPut(url: string, payload: any): Promise<AxiosResponse<any>> {
        return axios.put(url, payload);
    }
}