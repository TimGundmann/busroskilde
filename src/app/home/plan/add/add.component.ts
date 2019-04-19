import { Category, Plan, fileToBlob } from 'app/domain/plan';
import { Observable } from 'rxjs';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { PlanService } from 'app/services/plan.service';
import { NotificationService } from 'app/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '*',
        opacity: 1,
        display: 'flex'
      })),
      state('closed', style({
        height: '0',
        opacity: 0,
        display: 'none',
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class AddComponent implements OnChanges {

  private _editPlan: Plan;

  private days = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'];

  @Input() set editPlan(plan: Plan) {
    this._editPlan = plan;
    if (this._editPlan) {
      this.headLine.setValue(this._editPlan.headline);
      this.from.setValue(this._editPlan.from);
      this.to.setValue(this._editPlan.to);
      this.file.setValue([fileToBlob(this._editPlan)]);
      this.action = 'Rediger';
    } else {
      this.reset();
      this.action = 'Tilføj';
    }
  };

  @Input() category: Category;
  @Input() visisble = false;
  @Output() changeVisibility = new EventEmitter();

  public pdf = new FormControl(null, [FileUploadValidators.filesLimit(1), FileUploadValidators.accept(['.pdf'])]);

  action: string;

  addForm = new FormGroup({
    headLine: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    from: new FormControl(),
    to: new FormControl(),
    pdf: this.pdf,
    subCatetory: new FormControl()
  });

  constructor(
    private planService: PlanService,
    private notifications: NotificationService,
    private spinner: NgxSpinnerService) {
  }

  ngOnChanges() {
    this.updateValidationOnDates();
  }

  get headLine() {
    return <FormControl>this.addForm.get('headLine');
  }

  get subCategory() {
    return <FormControl>this.addForm.get('subCatetory');
  }

  get from(): FormControl {
    return <FormControl>this.addForm.get('from');
  }

  get to(): FormControl {
    return <FormControl>this.addForm.get('to');
  }

  get file(): FormControl {
    return <FormControl>this.addForm.get('pdf');
  }

  get planId(): string {
    if (this._editPlan) {
      return this._editPlan.id;
    }
    return undefined;
  }

  dateEnabled(): boolean {
    return this.category && this.category.type === 'FROM_TO';
  }

  isToCategory(): boolean {
    return this.category && this.category.type === 'TO';
  }

  add() {
    this.spinner.show();
    const reader = new FileReader();
    reader.readAsDataURL(this.file.value[0]);
    Observable.create(observer => {
      reader.onloadend = () => {
        observer.next(reader.result);
        observer.complete();
      };
    }).subscribe(file => {
      this.planService.add(
        {
          id: this.planId,
          headline: this.resolveHeadline(),
          from: this.from.value,
          to: this.to.value,
          category: this.category,
          subCategory: this.subCategory.value,
          file: file,
          fileType: this.file.value[0].type,
          fileName: this.file.value[0].name
        }
      ).subscribe(r => {
        if (r.okResult) {
          this.toggleAdd();
        } else {
          this.notifications.error('Der opstod en fejl, prøv igen senere!');
        }
        this.spinner.hide();
      });
    });
  }

  private resolveHeadline(): string {
    if (this.isToCategory()) {
      return this.days[new Date(this.to.value).getDay()];
    }
    return this.headLine.value;
  }

  toggleAdd() {
    this.visisble = !this.visisble;
    this.reset();
    this.changeVisibility.emit('' + this.visisble);
  }

  hasError(control): boolean {
    return control.invalid && (control.dirty || control.touched) && control.errors.required
  }

  hasDateError(control): boolean {
    return control.invalid && (control.dirty || control.touched) && !control.value;
  }

  private updateValidationOnDates() {
    if (this.category) {
      this.subCategory.setValue(this.category.subCategories[0]);
      if (this.dateEnabled()) {
        this.from.setValidators([Validators.required]);
        this.to.setValidators([Validators.required]);
      } else if (this.isToCategory()) {
        this.from.setValidators([]);
        this.headLine.setValidators([]);
      }
      this.from.updateValueAndValidity();
      this.to.updateValueAndValidity();
      this.headLine.updateValueAndValidity();
    }
  }

  private reset() {
    this.addForm.reset();
    this.file.setValue([]);
  }
}
