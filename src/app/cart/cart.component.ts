import { Component, OnInit } from '@angular/core';
import { SongService } from '../songs/song-list.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  cart: any[];

  constructor(private songService: SongService) { }

  ngOnInit(): void {
    this.songService.share.subscribe(data => this.cart = data.filter(song => song.inCart === true));
  }

  deleteItem(id: number) {
    this.cart = this.cart.filter(song => song.id !== id);
    this.songService.shareSongs(this.cart);
  }
  
}
