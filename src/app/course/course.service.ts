import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigurationService } from "../utility/configuration.service";
import { Course } from "./сourse.model";

@Injectable()
export class CourseService {

    constructor(private http: HttpClient,
                private configurationService: ConfigurationService) {}

    getAll(): Observable<Course[]> {
        const url = this.configurationService.getApiBaseUrl() + '/course';
        return this.http.get<Course[]>(url);
    }

    getByUser(id: string): Observable<Course[]> {
        const url = this.configurationService.getApiBaseUrl() + '/course/user/'+id;
        return this.http.get<Course[]>(url);
    }

}