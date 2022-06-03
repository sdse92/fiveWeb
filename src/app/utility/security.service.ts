import { map } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { ConfigurationService } from "./configuration.service";
import { Observable, pipe, Subject } from "rxjs";
import { SecurityToken } from './security.model';

@Injectable()
export class SecurityService {

    private storage = localStorage;
    authenticated = new Subject<boolean>();

    constructor(private http: HttpClient,
                private configurationService: ConfigurationService) {

    }

    isAuthenticated(): Observable<boolean> {
        const url = this.configurationService.getApiBaseUrl() + '/security/tokens/validator';
        return this.http.get<boolean>(url, {headers: {ignoreLoadingBar: '', ignoreError: ''}})
        .pipe(
            map((auth: boolean) => {
                if(!this.authenticated) {
                    this.removeFirstUrl();
                    this.removeTokenPayload();
                }
                this.authenticated.next(auth);
                return auth;
            })
        )
    }

    getCurrentToken(): string {
        return this.loadTokenPayload();
    }

    login(name: string, password: string, done: () => void): void {
        const invoice = {
            method: 'PASSWORD',
            name: name,
            password: password
        };
        const url = this.configurationService.getApiBaseUrl() + '/security/tokens/';
        const observable = this.http.post<SecurityToken>(url, invoice);
        observable.subscribe(token => {
            this.storeTokenPayload(token.payload);
            this.authenticated.next(true);
            done();
        });
    }

    logout(done: { (): Promise<boolean>; (): void; }): void {
        const url = this.configurationService.getApiBaseUrl() + '/security/tokens/current';
        this.removeFirstUrl();
        const observable = this.http.delete(url);
        observable.subscribe(() => {
            this.removeTokenPayload();
            this.authenticated.next(false);
            done();
        }, () => {
            this.removeTokenPayload();
            done();
        });
    }

    private loadTokenPayload(): string {
        return <string>this.storage.getItem('security-token-payload');
    }

    private storeTokenPayload(payload: string): void {
        this.storage.setItem('security-token-payload', payload);
    }

    private removeTokenPayload(): void {
        this.storage.removeItem('security-token-payload');
    }

    saveFirstUrl(firstUrl: string) {
        this.storage.setItem('first-url', firstUrl);
    }

    get firstUrl(): string {
        return <string>this.storage.getItem('first-url');
    }

    removeFirstUrl() {
        this.storage.removeItem('first-url')
    }

}