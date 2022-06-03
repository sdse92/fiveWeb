import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CourseService } from "../course/course.service";
import { Course } from "../course/сourse.model";
import { User } from "../user/user.model";
import { UserService } from "../user/user.service";
import { SecurityService } from "../utility/security.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    authenticated: boolean = false;

    private authChanged: Subscription = new Subscription;
    user!: User;
    courses!: Course[];
    courseNames!: string[];
    selectedCourseName!: string;


    constructor(private router: Router,
                private securityService: SecurityService,
                private userService: UserService,
                private courseService: CourseService) {}
    
    ngOnInit(): void {
        this.setAuth();
        this.authChanged = this.securityService.authenticated.subscribe((auth: boolean) => {
            this.authenticated = auth;
            if(this.authenticated) {
                this.getUser();
            }
        })
    }

    private setAuth() {
        this.securityService.isAuthenticated().subscribe((auth: boolean) => {
            this.authenticated = auth;
        })
    }

    private getUser() {
        this.userService.getCurrent().subscribe((user => {
            this.user = user;
            this.getCourses(<string>this.user.id);
        }))
    }

    private getCourses(userId: string) {
        this.courseService.getByUser(userId).subscribe(courses => {
            this.courses = courses;
            this.courseNames = [];
            courses.forEach((course) => {
                this.courseNames.push(course.name);
            })
        })
    }

    onLogout() {
        this.securityService.logout(() => this.router.navigate(['login']))
    }

    ngOnDestroy(): void {
        this.authChanged.unsubscribe;
    }
    
}