import { MessageService } from './../../services/message.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/services';
import { Rotation } from 'app/domain/rotation';
import saveAs from 'file-saver';

@Component({
  selector: 'app-rotation',
  templateUrl: './rotation.component.html',
  styleUrls: ['./rotation.component.scss']
})
export class RotationComponent implements OnInit {

  private pdfToggels: Map<Rotation, boolean> = new Map();

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

  updateFrom(rotation: Rotation, value: Date) {
    rotation.from = value;
    this.messageService.updateFrom(rotation.id, value)
      .subscribe(r => {
        if (!r.okResult) {
          this.notifications.error('Fejl ved opdatering af planen, prøv igen senere!');
        }
      });
  }

  updateTo(rotation: Rotation, value: Date) {
    rotation.to = value;
    this.messageService.updateTo(rotation.id, value)
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
    if (confirm('Er du sikker på at du vil slette ' + rotation.headline + ' ?')) {
      this.messageService.delete(rotation).subscribe(r => {
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
