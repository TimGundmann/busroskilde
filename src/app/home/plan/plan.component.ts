import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Category, fileToBlob, Plan } from 'app/domain/plan';
import { NotificationService } from 'app/services';
import { confirmDialog } from 'app/shared/confirm/confirm.component';
import saveAs from 'file-saver';
import { NgxSpinnerService } from 'ngx-spinner';
import { PlanService } from '../../services/plan.service';
import { fadeInAndOut, scrollInAndOut } from '../../shared/fade-in-animation';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['../list.scss'],
  animations: [
    fadeInAndOut,
    scrollInAndOut
  ]
})
export class PlanComponent {

  category: Category;

  @Input() odd: boolean;

  private pdfToggels: Map<Plan, string> = new Map();

  plans: Plan[] = [];
  editPlan: Plan;
  addVisible = false;

  state = 'close';

  constructor(
    router: Router,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private planService: PlanService,
    private notifications: NotificationService) {

    this.activatedRoute.data
      .subscribe(data => {
        this.state = 'close';
        this.category = data.category;
        setTimeout(() => {
          this.refreshPlans();
        }, 300);
      });

    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
          this.pdfToggels.clear();
      }
    });
  }

  updateFrom(plan: Plan, value: Date) {
    plan.from = value;
    this.planService.updateFrom(plan.id, value)
      .subscribe(r => {
        if (!r.okResult) {
          this.notifications.error('Fejl ved opdatering af planen, prøv igen senere!');
        }
      });
  }

  updateTo(plan: Plan, value: Date) {
    plan.to = value;
    this.planService.updateTo(plan.id, value)
      .subscribe(r => {
        if (!r.okResult) {
          this.notifications.error('Fejl ved opdatering af planen, prøv igen senere!');
        }
      });
  }

  isFirst(index: number): boolean {
    if (this.plans && this.plans.length > 0) {
      const currentSub = this.plans[index].subCategory;
      const firstIndex = this.plans.findIndex(p => p.subCategory === currentSub);
      return firstIndex === index;
    }
    return false;
  }

  canAlter(): boolean {
    return this.category && this.authService.hasRoles(this.category.alterRoles);
  }

  toggleAdd() {
    if (!this.addVisible) {
      this.editPlan = undefined;
    }
    this.addVisible = !this.addVisible;
  }

  togglePdf(plan: Plan) {
    const toggle = this.pdfToggels.get(plan);
    if (toggle === 'open') {
      this.pdfToggels.set(plan, 'close');
    } else {
      this.pdfToggels.set(plan, 'open');
    }

  }

  showPdf(plan: Plan): boolean {
    return this.pdfToggels.get(plan) === 'open';
  }

  getEditPlan(): Plan {
    return this.editPlan;
  }

  dowload(plan: Plan) {
    saveAs(fileToBlob(plan), plan.fileName);
  }

  edit(plan: Plan) {
    this.toggleAdd();
    this.editPlan = plan;
  }

  getSecureData(plan: Plan): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(plan.file);
  }

  delete(plan: Plan) {
    confirmDialog('Konfirmering', 'Er du sikker på at du vil slette ' + plan.headline + ' ?').then(okResult => {
      if (okResult) {
        this.planService.delete(plan).subscribe(r => {
          if (r.okResult) {
            this.refreshPlans();
          } else {
            this.notifications.error('Fejl ved sletning af plan!');
          }
        });
      }
    });
  }

  addChangeVisisblity() {
    this.addVisible = !this.addVisible;
    if (!this.addVisible) {
      this.refreshPlans();
    }
  }

  private refreshPlans() {
    this.planService.getActivePlansByCategory(this.category)
      .subscribe(result => {
        this.plans = [];
        let plans = result.returnValue;
        if (this.category.subCategories && this.category.subCategories.length > 0) {
          this.category.subCategories.forEach(key => {
            let found = false;
            plans = plans.filter(plan => {
              if (!found && plan.subCategory === key) {
                this.plans.push(plan);
                found = true;
                return false;
              } else {
                return true;
              }
            });
          })
        } else {
          this.plans = plans;
        }
        this.plans.forEach(r => this.pdfToggels.set(r, 'close'));
        this.state = 'open';
      });
  }

}
