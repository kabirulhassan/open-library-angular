import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { SearchResponse } from '../models/book-response.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private apiService: ApiService) {}
  // /search.json?q=${keyword}&limit=10`
  getAllBooks(searchQuery: string,pageNumber: number): Observable<SearchResponse> {
    const limit = 10;
    return this.apiService.get(
      `/search.json?q=${searchQuery
        .toLowerCase()
        .split(' ')
        .join('+')}&limit=${limit}&offset=${(pageNumber-1)*limit}`
    );
  }
}
