import { Component, OnInit } from "@angular/core";
import { AlbumEventsService } from "../../services/album-events.service";
import { AlertMessageService } from "../../services/alert-message.service";

@Component({
  selector: "app-alert-message",
  templateUrl: "./alert-message.component.html",
  styleUrls: ["./alert-message.component.css"]
})
export class AlertMessageComponent implements OnInit {
  isActive = false;
  textMessage = "";

  constructor(
    public albumEvents: AlbumEventsService,
    public alertMessage: AlertMessageService
  ) {}

  ngOnInit() {
    this.isActive = false;

    this.alertMessage.albumAlertEventObservableSubject.subscribe(
      (data: string) => {
        if (typeof data === "string") {
          this.isActive = true;
          this.textMessage = data;

          setTimeout(() => {
            this.isActive = false;
          }, 3000);
        }
      }
    );
  }
}
