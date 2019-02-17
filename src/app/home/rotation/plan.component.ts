import { PlanService } from '../../services/plan.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/services';
import { Plan } from 'app/domain/plan';
import saveAs from 'file-saver';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {

  private pdfToggels: Map<Plan, boolean> = new Map();

  addVisible = false;

  plans: Plan[] = [];

  constructor(
    private authService: AuthService,
    private planService: PlanService,
    private notifications: NotificationService) { }

  ngOnInit() {
    this.planService.getActivePlans()
      .subscribe(plans => {
        this.plans = plans;
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

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  toggleAdd() {
    this.addVisible = !this.addVisible;
  }

  togglePdf(plan: Plan) {
    const toggle = this.pdfToggels.get(plan);
    this.pdfToggels.set(plan, !toggle);
  }

  showPdf(plan: Plan): boolean {
    return this.pdfToggels.get(plan);
  }

  dowload(plan: Plan) {
    const blob = new Blob([this.base64ToArrayBuffer(plan.file.split(',')[1])], { type: plan.fileType });
    saveAs(blob, plan.fileName);
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

  private base64ToArrayBuffer(data: any) {
    const binaryString = window.atob(data);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

}
