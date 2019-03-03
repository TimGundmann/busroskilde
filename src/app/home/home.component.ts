import { PlanService } from './../services/plan.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'app/domain/plan';
import { fadeInAndOutForRoute } from 'app/home/fade-in-animation';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [
        fadeInAndOutForRoute,
    ]
})

export class HomeComponent implements OnInit {

    categories: Category[];

    constructor(private planService: PlanService, private router: Router) { }

    ngOnInit() {
        this.planService.getCategories().subscribe(result => this.categories = result.returnValue);
    }

    public getRouterOutletState(outlet) {
        return outlet.isActivated ? outlet.activatedRoute : '';
    }

}
