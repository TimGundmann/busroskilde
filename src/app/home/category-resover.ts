import { PlanService } from './../services/plan.service';
import { Category } from 'app/domain/plan';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CategoryResover implements Resolve<Category> {

    constructor(private planService: PlanService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category> {
        const categoryName = route.paramMap.get('category');
        return this.planService.getCategory(categoryName)
            .pipe(map(result => result.returnValue));
    }
}
