import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit{

    id: number | undefined;
    private subscription: Subscription;
    constructor(private activateRoute: ActivatedRoute){
         
        this.subscription = activateRoute.params.subscribe(params=>this.id=params['id']);
    }

    ngOnInit(): void {
        
    }

}