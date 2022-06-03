import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.dev";

@Injectable()
export class ConfigurationService {

    private apiBaseUrl: string;
    private clientBaseUrl: string;

    constructor() {
        this.apiBaseUrl = environment.apiBaseUrl;
        this.clientBaseUrl = environment.clientBaseUrl;
    }

    getApiBaseUrl(): string {
        return this.apiBaseUrl;
    }

}