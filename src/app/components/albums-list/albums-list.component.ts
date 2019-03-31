import { Component, OnInit } from "@angular/core";
import { AlbumsService } from "../../services/albums.service";
import { Album } from "../../interfaces/Album";
import { AlbumEventsService } from "../../services/album-events.service";
import { AlertMessageService } from "../../services/alert-message.service";

@Component({
  selector: "app-albums-list",
  templateUrl: "./albums-list.component.html",
  styleUrls: ["./albums-list.component.css"]
})
export class AlbumsListComponent implements OnInit {
  albums: Album[];

  constructor(
    public albumService: AlbumsService,
    public albumEvents: AlbumEventsService,
    public alertMessage: AlertMessageService
  ) {}

  ngOnInit() {
    this.albumService.getAlbums().subscribe(
      (data: Album[]) => {
        this.albums = data;
      },
      err => {
        console.log(err);
      },
      () => {
        console.log("complete");
      }
    );

    this.albumEvents.albumAddEventObservableSubject.subscribe((data: Album) => {
      if (data.title) {
        this.albums.unshift(data);
        this.alertMessage.emitAlertAlbum(`Добавлен элемент с ID=${data.id}`);
      }
    });

    this.albumEvents.albumADeleteEventObservableSubject.subscribe(
      (dataDelete: number) => {
        if (typeof dataDelete === "number") {
          this.albums = this.albums.filter((item) => {
            return item.id !== dataDelete;
          });
          this.alertMessage.emitAlertAlbum(
            `Удален элемент с ID=${dataDelete}`
          );
        }
      }
    );

    this.albumEvents.albumEditEventObservableSubject.subscribe(
      (dataEdit: Album) => {
        if (dataEdit.title) {
          const itemEdit = this.getItemByID(dataEdit.id);
          itemEdit.title = dataEdit.title;
          this.alertMessage.emitAlertAlbum(
            `Отредактирован элемент с ID=${dataEdit.id}`
          );
        }
      }
    );
  }

  getItemByID(id: number): Album {
    for (let i = 0; i < this.albums.length; i++) {
      if (this.albums[i].id === id) {
        return this.albums[i];
      }
    }
  }
}
