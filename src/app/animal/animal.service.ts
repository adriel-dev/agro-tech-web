import { Injectable } from '@angular/core';
import { Species } from '../species/model/Species';
import { Breed } from '../breed/model/Breed';
import { Farm } from '../farm/model/Farm';
import { Animal, PagedAnimals, SexEnum } from './model/Animal';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private readonly URL: string = `${environment.apiUrl}/animal`;

  constructor(private http: HttpClient) { }

  findAllAnimals(pageNumber: number = 1, pageSize: number = 10): Observable<PagedAnimals> {
    const findAllUrl = `${this.URL}/find/all`;
    return this.http.get<PagedAnimals>(findAllUrl);
  }

}
