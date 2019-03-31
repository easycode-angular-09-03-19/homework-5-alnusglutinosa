import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Album } from "../interfaces/Album";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class AlbumsService {
  private apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.apiUrl}/albums`);
  }

  addNewAlbum(album: Album): Observable<Album> {
    return this.http.post<Album>(`${this.apiUrl}/albums`, album);
  }

  deleteAlbum(id: number): Observable<Album> {
    return this.http.delete<Album>(`${this.apiUrl}/albums/${id}`);
  }

  editAlbum(album: Album): Observable<Album> {
    return this.http.put<Album>(`${this.apiUrl}/albums/${album.id}`, album);
  }
}
