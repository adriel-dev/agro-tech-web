import { Injectable } from '@angular/core';
import { PagedAnimals } from './model/Animal';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private readonly URL: string = `${environment.apiUrl}/animal`;

  constructor(private httpClient: HttpClient) { }

  findAllAnimals(page: number = 0, size: number = 10, speciesIds: string[], animalName: string, externalId: string): Observable<PagedAnimals> {
    const findAllUrl = `${this.URL}/find/all`;
    let params = new HttpParams();
    params = params.set('page', page);
    params = params.set('size', size);
    if (speciesIds.length > 0) params = params.set('speciesIds', speciesIds.join(','));
    if (animalName !== "") params = params.set('animalName', animalName);
    if (externalId !== "") params = params.set('externalId', externalId);
    return this.httpClient.get<PagedAnimals>(findAllUrl, { params });
  }

  saveAnimal(formData: FormData) {
    const saveAnimalUrl = `${this.URL}/save`;
    return this.httpClient.post(saveAnimalUrl, formData);
  }

  editAnimal(formData: FormData, animalId: string) {
    const editAnimalUrl = `${this.URL}/update/${animalId}`;
    return this.httpClient.put(editAnimalUrl, formData);
  }

}
