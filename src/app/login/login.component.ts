import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SecurityService } from "../utility/security.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })
  export class LoginComponent implements OnInit {
      loginFormCtrl!: FormGroup;

    constructor(private router: Router,
                private securityService: SecurityService,
                private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.securityService.isAuthenticated().subscribe(auth => {
            if(auth) {

            }
        });
        this.loginFormCtrl = this.formBuilder.group({
            name: ['', [Validators.required]],
            password: ['',[Validators.required]]
        })
    }


    onLogin(form: FormGroupDirective) {
        const name = form.value.name;
        const password = form.value.password;
        this.securityService.login(name, password, () => {
            this.leave();
        })
    }

    private leave() {
        const firstUrl = this.securityService.firstUrl;
        this.router.navigate([firstUrl ? firstUrl : '/']);
    }

  }