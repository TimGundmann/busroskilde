import { SubCategory, deepCopy } from './../../domain/plan';
import { Category } from 'app/domain/plan';
import { PlanService } from 'app/services/plan.service';
import { Component, OnInit } from '@angular/core';
import { roles } from 'app/domain/user';
import { NotificationService } from 'app/services';
import { confirmDialog } from 'app/shared/confirm/confirm.component';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['../list.scss', './configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  categories: Category[];

  selected: Category;

  newSubCategory: string;

  nameNewMode = false;

  types = [
    { displayName: 'Enkelt uden datoer', value: 'SIMPLE' },
    { displayName: 'Med til dato', value: 'TO' },
    { displayName: 'Med fra og til datoer', value: 'FROM_TO' }
  ]

  get roles() {
    return roles.filter(r => r.role !== 'ADMIN');
  }

  constructor(private planService: PlanService, private notifcations: NotificationService) { }

  ngOnInit() {
    this.planService.getCategories()
      .subscribe(result => {
        if (result.okResult) {
          this.nameNewMode = false;
          this.categories = result.returnValue;
          if (this.categories.length > 0) {
            this.selected = this.categories[0];
          }
        }
      });
  }

  select(category: Category) {
    this.selected = deepCopy(category);
  }

  getSelectedIndex(): number {
    if (this.selected) {
      return this.types.findIndex(t => t.value === this.selected.type);
    }
    return 0;
  }

  isRoleActive(role: string): boolean {
    return this.selected && this.selected.alterRoles && this.selected.alterRoles.includes(role);
  }

  changeRole(role: any) {
    const index = this.selected.alterRoles.indexOf(role.role);
    if (index > -1) {
      this.selected.alterRoles.splice(index, 1);
    } else {
      this.selected.alterRoles.push(role.role);
    }
  }

  addSubcategory() {
    this.selected.subCategories.push({ name: this.newSubCategory });
    this.newSubCategory = '';
  }

  deleteSubcategory(index: number) {
    this.selected.subCategories.splice(index, 1);
  }

  deleteCategory() {
    confirmDialog('Slet', 'Sletning af kategorien kan medføre datatab. Slet kategorien?').then(ok => {
      if (ok) {
        this.planService.deleteCategory(this.selected.name)
          .subscribe(result => {
            if (result.okResult) {
              this.ngOnInit();
            } else {
              this.notifcations.error('Fejl ved sletning af kategori!');
            }
          });
      }
    });
  }

  newCategory() {
    this.selected = { name: '', alterRoles: [roles[4].role], subCategories: [], type: this.types[0].value };
    this.nameNewMode = true;
  }

  updateCategory() {
    this.planService.updateCategory(this.selected)
      .subscribe(result => {
        if (result.okResult) {
          this.ngOnInit();
        } else {
          this.notifcations.error('Fejl ved oprettesle af kategori!');
        }
      });
  }

}
