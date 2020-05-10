import { Component, OnInit } from '@angular/core';
import { SongService } from './song-list.service';

@Component({
    templateUrl: './song-list.component.html',
    styleUrls: ['./song-list.component.css']
})
export class SongsComponent implements OnInit {
    songs: any[] = [];
    cart: any[] = [];
    filteredSongs: any[] = [];
    paginatedSongs: any[] = [];
    SONG_PER_PAGE: number = 10;
    currentPage: number = 1;
    pageNumbers: number[];
    indexOfLastSong: number = this.currentPage * this.SONG_PER_PAGE;
    indexOfFirstSong: number = this.indexOfLastSong - this.SONG_PER_PAGE;

    _songFilter = '';
    get songFilter(): string {
        return this._songFilter;
    }
    set songFilter(value: string) {
        this._songFilter = value;
        this.filteredSongs = this.songFilter ? this.performFilter(this.songFilter) : this.songs;
        this.currentPage = 1;
        this.pagination();
        this.indexOfLastSong = this.currentPage * this.SONG_PER_PAGE;
        this.indexOfFirstSong = this.indexOfLastSong - this.SONG_PER_PAGE;
        this.paginatedSongs = this.filteredSongs.slice(this.indexOfFirstSong, this.indexOfLastSong);
    }

    constructor(private songService: SongService) {
    }

    ngOnInit() {
        this.songs = this.songService.getSongs();
        this.songService.share.subscribe(cart => this.cart = cart || [])
        this.setSongListByCart();
        this.filteredSongs = this.songs;
        this.paginatedSongs = this.filteredSongs.slice(0, this.SONG_PER_PAGE);
        this.pagination();
    }

    setSongs() {
        let tempSongs = [];
        this.songService.getSongs().forEach(item => {
            const singleItem = { ...item };
            tempSongs = [...tempSongs, singleItem];
        });
        return [...tempSongs];
    };

    performFilter(inputValue: string): any[] {
        inputValue = inputValue.toLocaleLowerCase();
        return this.songs.filter(song => song.title.toLocaleLowerCase().indexOf(inputValue) !== -1);
    }

    onSetPage(page: number) {
        this.currentPage = page;
        this.indexOfLastSong = this.currentPage * this.SONG_PER_PAGE;
        this.indexOfFirstSong = this.indexOfLastSong - this.SONG_PER_PAGE;
        this.paginatedSongs = this.filteredSongs.slice(this.indexOfFirstSong, this.indexOfLastSong);
    }

    pagination() {
        const pages = Math.ceil(this.filteredSongs.length / 10);
        let pageToIterate = [];
        for (let i = 1; i < pages + 1; i++) {
            pageToIterate = [...pageToIterate, i];
        }
        this.pageNumbers = pageToIterate;
    }

    addToCart(id: number) {
        const song = this.songs.find(item => item.id === id);
        let tempProducts = [...this.songs];
        const index = tempProducts.indexOf(song);
        const product = tempProducts[index];
        product.inCart = true;
        this.cart = [...this.cart, product];
        this.songs = [...tempProducts];
        this.songService.shareSongs(this.cart);
    }

    setSongListByCart() {
        let cartIds = this.cart.map(item => item.id);
        let setSongList = this.setSongs();
        cartIds.forEach(id => {
            setSongList = setSongList.map(song => song.id === id ? { ...song, inCart: true } : song);
        });
        this.songs = setSongList;
    }

}

