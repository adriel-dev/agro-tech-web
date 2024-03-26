import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private readonly URL: string = `${environment.apiUrl}/image`;

  constructor(private httpClient: HttpClient) { }

  findImageByAnimalId(animalId: string) {
    const findByAnimalIdUrl = `${this.URL}/get/${animalId}`;
    return this.httpClient.get(findByAnimalIdUrl, { responseType: "arraybuffer" })
  }

}
