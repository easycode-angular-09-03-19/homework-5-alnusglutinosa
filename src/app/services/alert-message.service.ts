import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AlertMessageService {
  private albumAlertEventSource = new BehaviorSubject({});
  public albumAlertEventObservableSubject = this.albumAlertEventSource.asObservable();

  constructor() {}

  emitAlertAlbum(value: string) {
    this.albumAlertEventSource.next(value);
  }
}
