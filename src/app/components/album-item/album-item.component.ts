import { Component, OnInit, Input } from "@angular/core";
import { Album } from "../../interfaces/Album";
import { AlertMessageService } from "../../services/alert-message.service";
import { AlbumsService } from "../../services/albums.service";
import { AlbumEventsService } from "../../services/album-events.service";

@Component({
  selector: "app-album-item",
  templateUrl: "./album-item.component.html",
  styleUrls: ["./album-item.component.css"]
})
export class AlbumItemComponent implements OnInit {
  album = {
    title: ""
  };
  isEdit = false;
  albumEmpty: Album = {
    userId: 0,
    title: ""
  };

  @Input() item: Album;
  constructor(
    public albumService: AlbumsService,
    public alertMessage: AlertMessageService,
    public albumEvents: AlbumEventsService
  ) {}

  ngOnInit() {
    this.albumEvents.albumEditEventObservableSubject.subscribe(
      (data: Album) => {
        if (data.title) {
          this.isEdit = false;
        }
      }
    );
  }

  onDeleteItem(id: number) {
    this.albumService.deleteAlbum(id).subscribe((data: Album) => {
      this.albumEvents.emitDeleteAlbum(id);
    });
  }

  onEditItem(editAlbumId: Album) {
    if (editAlbumId.id) {
      this.isEdit = !this.isEdit;

      if (this.isEdit) {
        this.albumEvents.emitEditFromItemAlbum(editAlbumId);
      } else {
        this.albumEvents.emitEditFromItemAlbum(this.albumEmpty);
      }
    }
  }
}
