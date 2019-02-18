import { PlanService } from './../services/plan.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'app/domain/plan';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

    categories: Category[];

    constructor(private planService: PlanService) { }

    ngOnInit() {
        this.planService.getCategories().subscribe(categories => this.categories = categories);
    }
}
