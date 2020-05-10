import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import songList from '../../assets/song-list.json'


@Injectable({ providedIn: 'root' })
export class SongService {
  private songs = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('cart')));
  public share = this.songs.asObservable();

  shareSongs(songs) {
    localStorage.setItem('cart', JSON.stringify(songs));
    let data = JSON.parse(localStorage.getItem('cart'));
    this.songs.next(data);
  }

  getSongs() {
    return songList;
  };
}

