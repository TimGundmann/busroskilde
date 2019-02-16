import { Observable } from 'rxjs';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'app/services/message.service';
import { NotificationService } from 'app/services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  @Input() visisble = false;
  @Output() changeVisibility = new EventEmitter();

  public pdf = new FormControl(null, FileUploadValidators.filesLimit(1));

  addForm = new FormGroup({
    headLine: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    from: new FormControl('', [Validators.required]),
    to: new FormControl('', [Validators.required]),
    pdf: this.pdf,
  });

  constructor(private messageService: MessageService, private notifications: NotificationService, private spinner: NgxSpinnerService) { }

  get headLine()   {
    return <FormControl>this.addForm.get('headLine');
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
      this.messageService.add(
        {
          headline: this.headLine.value,
          from: this.from.value,
          to: this.to.value,
          file: file,
          fileType: this.file.value[0].type,
          fileName: this.file.value[0].name
        }
      ).subscribe(r => {
        if (r.okResult) {
          this.addForm.reset();
          this.toggleAdd();
        } else {
          this.notifications.error('Der opstod en fejl, prøv igen senere!');
        }
        this.spinner.hide();
      });
    });
  }

  toggleAdd() {
    this.visisble = !this.visisble;
    this.changeVisibility.emit('' + this.visisble);
  }

}
