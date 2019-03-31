import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Album } from "../interfaces/Album";

@Injectable({
  providedIn: "root"
})
export class AlbumEventsService {
  private albumAddEventSource = new BehaviorSubject({});
  public albumAddEventObservableSubject = this.albumAddEventSource.asObservable();

  private albumDeleteEventSource = new BehaviorSubject({});
  public albumADeleteEventObservableSubject = this.albumDeleteEventSource.asObservable();

  private albumEditEventSource = new BehaviorSubject({});
  public albumEditEventObservableSubject = this.albumEditEventSource.asObservable();

  private albumEditFromItemEventSource = new BehaviorSubject({});
  public albumEditFromItemEventObservableSubject = this.albumEditFromItemEventSource.asObservable();

  constructor() {}

  emitAddNewAlbum(value: Album) {
    this.albumAddEventSource.next(value);
  }

  emitDeleteAlbum(value: number) {
    this.albumDeleteEventSource.next(value);
  }

  emitEditAlbum(value: Album) {
    this.albumEditEventSource.next(value);
  }

  emitEditFromItemAlbum(value: Album) {
    this.albumEditFromItemEventSource.next(value);
  }
}
