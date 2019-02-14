import { Observable } from 'rxjs';
import { getTestBed } from '@angular/core/testing';
import { MessageService } from './../../services/message.service';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { NotificationService } from 'app/services';
import { Rotation } from 'app/domain/rotation';
import saveAs from 'file-saver';
import { ReadVarExpr } from '@angular/compiler';

@Component({
  selector: 'app-rotation',
  templateUrl: './rotation.component.html',
  styleUrls: ['./rotation.component.scss']
})
export class RotationComponent implements OnInit {

  private pdfToggels: Map<Rotation, boolean> = new Map();

  private pdf = new FormControl(null, FileUploadValidators.filesLimit(1));

  addForm = new FormGroup({
    headLine: new FormControl('', [Validators.required]),
    from: new FormControl('', [Validators.required]),
    to: new FormControl('', [Validators.required]),
    pdf: this.pdf,
  });

  addVisible = false;

  rotations: Rotation[] = [];

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private notifications: NotificationService) { }

  ngOnInit() {
    this.messageService.getActiveRotations()
      .subscribe(rotations => {
        this.rotations = rotations;
        this.rotations.forEach(r => this.pdfToggels.set(r, false));
      });
  }

  get headLine(): string {
    return this.addForm.get('headLine').value;
  }

  get from(): Date {
    return this.addForm.get('from').value;
  }

  get to(): Date {
    return this.addForm.get('to').value;
  }

  get file(): File {
    return this.addForm.get('pdf').value[0];
  }

  add() {
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    Observable.create(observer => {
      reader.onloadend = () => {
        observer.next(reader.result);
        observer.complete();
      };
    }).subscribe(file => {
      this.messageService.add(
        { headline: this.headLine, from: this.from, to: this.to, file: file, fileType: this.file.type, fileName: this.file.name }
      ).subscribe(r => {
        if (r.okResult) {
          this.ngOnInit();
          this.toggleAdd();
        } else {
          this.notifications.error('Der opstod en fejl, prøv igen senere!');
        }
      });
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  toggleAdd() {
    this.addVisible = !this.addVisible;
  }

  togglePdf(rotation: Rotation) {
    const toggle = this.pdfToggels.get(rotation);
    this.pdfToggels.set(rotation, !toggle);
  }

  showPdf(rotation: Rotation): boolean {
    return this.pdfToggels.get(rotation);
  }

  dowload(rotation: Rotation) {
    const blob = new Blob([this.base64ToArrayBuffer(rotation.file.split(',')[1])], { type: rotation.fileType });
    saveAs(blob, rotation.fileName);
  }

  delete(rotation: Rotation) {
    this.messageService.delete(rotation).subscribe(r => {
      if (r.okResult) {
        this.ngOnInit();
      } else {
        this.notifications.error('Fejl ved sletning af plan!');
      }
    });
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
