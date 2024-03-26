import { Injectable } from '@angular/core';
import { Species } from '../species/model/Species';
import { Breed } from '../breed/model/Breed';
import { Farm } from '../farm/model/Farm';
import { Animal, PagedAnimals, SaveAnimalRequest, SexEnum } from './model/Animal';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private readonly URL: string = `${environment.apiUrl}/animal`;

  constructor(private http: HttpClient) { }

  findAllAnimals(page: number = 0, size: number = 10): Observable<PagedAnimals> {
    const findAllUrl = `${this.URL}/find/all`;
    return this.http.get<PagedAnimals>(findAllUrl, { params: { page, size } });
  }

  saveAnimal(formData: FormData) {
    const saveAnimalUrl = `${this.URL}/save`;
    return this.http.post(saveAnimalUrl, formData);
  }

  editAnimal(formData: FormData, animalId: string) {
    const editAnimalUrl = `${this.URL}/update/${animalId}`;
    return this.http.put(editAnimalUrl, formData);
  }

}
