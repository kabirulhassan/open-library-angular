import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SubjectsService } from '../../core/services/subjects.service';
import { Book } from 'src/app/core/models/book-response.model';
import { Location } from '@angular/common';
import { ErrorState } from 'src/app/core/enums/error.enum';
import { catchError, finalize, of } from 'rxjs';
@Component({
  selector: 'front-end-internship-assignment-trending-subjects',
  templateUrl: './trending-subjects.component.html',
  styleUrls: ['./trending-subjects.component.scss'],
})
export class TrendingSubjectsComponent implements OnInit {

  errorState: ErrorState | null = null;

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  isLoading: boolean = true;

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  subjectName: string = '';

  allBooks: Book[] = [];


  constructor(
    private route: ActivatedRoute,
    private subjectsService: SubjectsService,
    private location: Location
  ) {}

  getAllBooks() {
    this.subjectsService.getAllBooks(this.subjectName)
    .pipe(
      catchError((err) => {
        this.isLoading = false;
        this.errorState = ErrorState.API_ERROR;
        throw of(null);
      }
    ),
      finalize(() => {
        this.isLoading = false;
      }
    ))
    .subscribe((data) => {
      if(!data)
        return;
      if(data?.works.length === 0){
        this.errorState = ErrorState.NO_DATA;
        return;
      }
      this.allBooks = data?.works;
      // this.subjectsArray = data;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.subjectName = params.get('name') || '';
      this.isLoading = true;
      this.getAllBooks();
    });
  }

  goBackToPreviousPage() {
    this.location.back();
  }

}
