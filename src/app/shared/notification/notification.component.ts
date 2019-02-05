import { Alert, NotificationService } from '../../services';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

    public alerts: Array<Alert> = [];

    constructor(private notifications: NotificationService) {}

    ngOnInit() {
        this.notifications.getAlert().subscribe(alert => {
            if (alert) {
                this.alerts.push(alert);
            } else {
                this.alerts = [];
            }
        });
    }

    public closeAlert(alert: Alert) {
        this.alerts = this.alerts.filter(x => x !== alert);
    }

}

