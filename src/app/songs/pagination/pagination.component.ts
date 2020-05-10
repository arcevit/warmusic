import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})

export class PaginationComponent {
  @Input() numOfSongs: number;
  @Input() pageNumbers: number[];
  @Output() setPage = new EventEmitter<number>();
  currentPage: number = 1;
  SONG_PER_PAGE: number = 10;

  constructor() { }

  previous() {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
    }
    this.setPage.emit(this.currentPage);
  }

  next() {
    const pageNumber = Math.ceil(this.numOfSongs / this.SONG_PER_PAGE + 1);
    if (this.currentPage < pageNumber - 1) {
      this.currentPage = this.currentPage + 1;
    }
    this.setPage.emit(this.currentPage);
  }

  paginate(page) {
    this.setPage.emit(page);
    this.currentPage = page;
  }

}
