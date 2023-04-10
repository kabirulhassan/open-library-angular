import { Injectable } from '@angular/core';
import { Author } from '../models/book-response.model';

@Injectable({
  providedIn: 'root'
})
export class TransformAuthorsService {

  transformAuthors(author_name: string[]): Author[] {
    const authors: Author[] = [];
    for (let index = 0 ; index < author_name.length ; index++) {
      const authour: Author = {
        name: author_name[index],
        key: index.toString()
      };
      authors.push(authour);
    }
    return authors;
  }
}
