import { Component, OnInit, ViewChild } from "@angular/core";
import { AlbumsService } from "../../services/albums.service";
import { AlbumEventsService } from "../../services/album-events.service";
import { Album } from "../../interfaces/Album";
import { NgForm } from "@angular/forms";
import { AlertMessageService } from "../../services/alert-message.service";

@Component({
  selector: "app-add-album-form",
  templateUrl: "./add-album-form.component.html",
  styleUrls: ["./add-album-form.component.css"]
})
export class AddAlbumFormComponent implements OnInit {
  album = {
    title: ""
  };

  editAlbum: Album;

  isEdit = false;
  @ViewChild("addAlbumForm") form: NgForm;
  constructor(
    public albumService: AlbumsService,
    public albumEvents: AlbumEventsService
  ) {}

  ngOnInit() {
    this.albumEvents.albumEditFromItemEventObservableSubject.subscribe(
      (data: Album) => {
        this.editAlbum = data;

        if (data.title) {
          this.album.title = data.title;
          this.isEdit = true;
        } else if (Object.keys(data).length) {
          this.album.title = "";
          this.isEdit = false;
        }
      }
    );
  }
  onFormSubmit() {
    const newAlbum = {
      userId: 1,
      title: this.album.title
    };

    if (this.isEdit) {
      this.editAlbum.title = this.album.title;

      this.albumService.editAlbum(this.editAlbum).subscribe((data: Album) => {
        this.albumEvents.emitEditAlbum(this.editAlbum);
        this.isEdit = false;
      });
    } else {
      this.albumService.addNewAlbum(newAlbum).subscribe((data: Album) => {
        this.albumEvents.emitAddNewAlbum(data);
      });
    }

    this.form.resetForm();
  }
}
