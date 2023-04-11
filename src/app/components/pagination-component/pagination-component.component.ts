import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { catchError, finalize, map, of } from 'rxjs';
import { ErrorState } from 'src/app/core/enums/error.enum';
import { Book } from 'src/app/core/models/book-response.model';
import { SearchService } from 'src/app/core/services/search.service';
import { TransformAuthorsService } from 'src/app/core/services/transform-authors.service';

@Component({
  selector: 'front-end-internship-assignment-pagination-component',
  templateUrl: './pagination-component.component.html',
  styleUrls: ['./pagination-component.component.scss'],
})
export class PaginationComponentComponent implements OnChanges {
  @Input() searchQuery = '';
  currentPage = 1;
  totalPages = 0;

  books: Array<Book> = [];
  errorState: ErrorState | null = null;
  isLoading = false;

  constructor(private searchService: SearchService, private transformAuthors: TransformAuthorsService) {}

  changePage(page: number): void {
      this.currentPage += page;
      console.log(this.currentPage);
      this.getSearchData();
  }

  getSearchData(){
    this.isLoading = true;
    const limit = 10;
    this.searchService.getAllBooks(this.searchQuery, this.currentPage)
    .pipe(
      catchError((err) => {
        // this.isLoading = false;
        this.errorState = ErrorState.API_ERROR;
        throw of(null);
      }
    ),
      finalize(() => {
        this.isLoading = false;
      }))
    .subscribe((data) => {
      if(!data)
        return;
      if(data?.docs.length === 0){
        this.errorState = ErrorState.NO_DATA;
        return;
      }
      this.errorState = null;
      for(const book of data.docs){
        book.authors = this.transformAuthors.transformAuthors(book.author_name || []);
      }
      this.books = data?.docs;
      this.totalPages = Math.ceil(data.numFound / limit);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.errorState = null;
    if (changes['searchQuery']) {
      this.currentPage = 1;
      if(this.searchQuery !== '')
        this.getSearchData();
      else{
        this.books = [];
      }
    }
  }
}
