import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigurationService } from "../utility/configuration.service";
import { User } from "./user.model";

@Injectable()
export class UserService {

    constructor(private http: HttpClient,
                private configurationService: ConfigurationService) {}

    getCurrent(): Observable<User> {
        const url = this.configurationService.getApiBaseUrl() + '/user/current';
        return this.http.get<User>(url);
    }

}