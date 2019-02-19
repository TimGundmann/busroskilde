import { PlanService } from '../../services/plan.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from 'app/services';
import { Plan, Category, fileToBlob } from 'app/domain/plan';
import saveAs from 'file-saver';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {

  @Input() category: Category;
  @Input() odd: boolean;

  private pdfToggels: Map<Plan, boolean> = new Map();

  addVisible = false;

  plans: Plan[] = [];

  editPlan: Plan;

  constructor(
    private authService: AuthService,
    private planService: PlanService,
    private notifications: NotificationService) { }

  ngOnInit() {
    this.planService.getActivePlansByCategory(this.category)
      .subscribe(plans => {
        this.plans = plans;
        this.plans.sort((p1, p2) => {
          if (p1.subCategory && p1.subCategory) {
            if (p1.subCategory.name > p2.subCategory.name) {
              return 1;
            }
            if (p1.subCategory.name < p2.subCategory.name) {
              return -1;
            }
          }
          return 0;
        });
        this.plans.forEach(r => this.pdfToggels.set(r, false));
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
    const currentSub = this.plans[index].subCategory;
    const firstIndex = this.plans.findIndex(p => p.subCategory.name === currentSub.name);
    return firstIndex === index;
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  toggleAdd() {
    if (!this.addVisible) {
      this.editPlan = undefined;
    }
    this.addVisible = !this.addVisible;
  }

  togglePdf(plan: Plan) {
    const toggle = this.pdfToggels.get(plan);
    this.pdfToggels.set(plan, !toggle);
  }

  showPdf(plan: Plan): boolean {
    return this.pdfToggels.get(plan);
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

  delete(plan: Plan) {
    if (confirm('Er du sikker på at du vil slette ' + plan.headline + ' ?')) {
      this.planService.delete(plan).subscribe(r => {
        if (r.okResult) {
          this.ngOnInit();
        } else {
          this.notifications.error('Fejl ved sletning af plan!');
        }
      });
    }
  }

  addChangeVisisblity() {
    this.addVisible = !this.addVisible;
    if (!this.addVisible) {
      this.ngOnInit();
    }
  }

}
