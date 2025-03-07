import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {AppConfig} from "../app.config";

@Injectable({
  providedIn: 'root'
})

export class RestApiService {

    url: string = 'https://bankersvascular.com/banker_api/';
    constructor(public http: HttpClient) {
        this.url = AppConfig.API_URL;
    }

    put(endpoint: string, body: any, reqOpts?: any) {
        return this.http.put(this.url + '/' + endpoint, body, reqOpts);
    }

    delete(endpoint: string, reqOpts?: any) {
        return this.http.delete(this.url + '/' + endpoint, reqOpts);
    }

    patch(endpoint: string, body: any, reqOpts?: any) {
        return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
    }

    get(endpoint: string, params?: any, reqOpts?: any, isLocal?:boolean) {
        if (!reqOpts) {
            reqOpts = {
                params: new HttpParams()
            };
        }
        if (params) {
            reqOpts.params = new HttpParams();
            for (let k in params) {
                reqOpts.params = reqOpts.params.set(k, params[k]);
            }
        }
        return this.http.get((isLocal ? "" : this.url + '/') + endpoint, reqOpts);
    }

    post(endpoint: string, body: any, reqOpts?: any) {
        body.securitykey = AppConfig.SECURITY_TOKEN;
        return this.http.post(this.url + '/' + endpoint, body, reqOpts);
    }
}
