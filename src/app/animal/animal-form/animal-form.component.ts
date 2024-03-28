import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Animal, SaveAnimalRequest } from '../model/Animal';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BreedService } from 'src/app/breed/breed.service';
import { Breed } from 'src/app/breed/model/Breed';
import { AnimalService } from '../animal.service';
import { Species } from 'src/app/species/model/Species';
import { Farm } from 'src/app/farm/model/Farm';
import { ToastrService } from 'ngx-toastr';
import { SpeciesService } from 'src/app/species/species.service';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.scss']
})
export class AnimalFormComponent implements OnInit {

  breeds: Breed[] = [];

  species: Species[] = []

  isEdit = false

  animalForm!: FormGroup;

  selectedFile: File | undefined;
  selectedFileName: string = '';
  selectedFileBlob!: Blob;
  selectedFileUrl: string | ArrayBuffer | null = null;
  selectedFileErrorMsg: string = "";

  constructor(
    public dialogRef: MatDialogRef<AnimalFormComponent>, 
    @Inject(MAT_DIALOG_DATA) public animalData: { animal: Animal, imageBase64: string }, 
    private formBuilder: FormBuilder,
    private animalService: AnimalService,
    private speciesService: SpeciesService,
    private breedService: BreedService,
    private toastService: ToastrService
  ){
    this.isEdit = this.animalData !== null ? true : false
    this.animalForm = this.formBuilder.group({
      name: new FormControl(),
      sex: new FormControl('', Validators.required),
      acquisitionDate: new FormControl(''),
      saleDate: new FormControl(''),
      acquisitionValue: new FormControl(0, Validators.required),
      saleValue: new FormControl(0, Validators.required),
      species: new FormControl(null, Validators.required),
      breed: new FormControl(null, Validators.required)
    });
  }
  
  ngOnInit(): void {
    this.speciesService.findAllSpecies().subscribe({
      next: (species) => {
        this.species = species
      },
      error: (error) => {
        this.toastService.error("ERRO AO CARREGAR LISTA DE ESPÉCIES!")
        console.log(error);
      },
      complete: () => {
        if(this.isEdit) {
          const speciesId = this.animalData.animal.breed.species?.id!;
          this.breedService.findBreedsBySpeciesId(speciesId).subscribe({
            next: (breedsList) => {
              this.breeds = breedsList;
            },
            error: (error) => {
              this.toastService.error("ERRO AO CARREGAR LISTA DE RAÇAS!");
              console.error(error);
            },
            complete: () => {
              this.animalForm.setValue({
                name: this.animalData.animal.name,
                sex: this.animalData.animal.sex,
                acquisitionDate: this.animalData.animal.acquisitionDate,
                saleDate: this.animalData.animal.saleDate,
                acquisitionValue: this.animalData.animal.acquisitionValue,
                saleValue: this.animalData.animal.saleValue,
                species: this.animalData.animal.breed.species?.id,
                breed: this.animalData.animal.breed.id
              });
              this.selectedFileUrl = this.animalData.imageBase64
            }
          });
        }
      }
    });
  }

  onSubmit() {
    let animalFormValues = this.animalForm.value;
    let body: Animal | SaveAnimalRequest
    if(this.isEdit) {
      body = new Animal(
        this.animalData.animal.id,
        this.animalData.animal.externalId,
        animalFormValues.name, 
        animalFormValues.sex, 
        animalFormValues.acquisitionDate, 
        animalFormValues.saleDate, 
        animalFormValues.acquisitionValue, 
        animalFormValues.saleValue, 
        new Breed(animalFormValues.breed), 
        new Farm(localStorage.getItem("farmId")!)
      );
      const formData = new FormData();
      const data = new Blob([JSON.stringify(body)], { type: "application/json" });
      formData.append("data", data);
      if(this.selectedFile) formData.append("image", this.selectedFile, this.selectedFile.name);
      this.animalService.editAnimal(formData, this.animalData.animal.id).subscribe({
        next: (res) => {
          this.toastService.success("ANIMAL EDITADO COM SUCESSO!");
          this.dialogRef.close("success");
        },
        error: (error) => {
          this.toastService.error("ERRO AO CADASTRAR ANIMAL!")
          console.error(error);
        },
        complete: () => {
        }
      });
    } else {
      body = new SaveAnimalRequest(
        animalFormValues.name, 
        animalFormValues.sex, 
        animalFormValues.acquisitionDate, 
        animalFormValues.saleDate, 
        animalFormValues.acquisitionValue, 
        animalFormValues.saleValue, 
        animalFormValues.breed, 
        localStorage.getItem("farmId")
      );
      const formData = new FormData();
      const data = new Blob([JSON.stringify(body)], { type: "application/json" });
      formData.append("data", data);
      if(this.selectedFile) formData.append("image", this.selectedFile, this.selectedFile.name);
      this.animalService.saveAnimal(formData).subscribe({
        next: (res) => {
          this.toastService.success("ANIMAL CADASTRADO COM SUCESSO!", undefined);
          this.dialogRef.close("success");
        },
        error: (error) => {
          this.toastService.error("ERRO AO CADASTRAR ANIMAL!")
          console.error(error);
        },
        complete: () => {

        }
      });;
    }
  }

  onSpeciesSelectChange(event: any) {
    const speciesId = event.value;
    this.breedService.findBreedsBySpeciesId(speciesId).subscribe({
      next: (breedList) => {
        this.animalForm.patchValue({
          breed: null
        });
        this.breeds = breedList;
      },
      error: (error) => {
        this.toastService.error("ERRO AO CARREGAR LISTA DE RAÇAS!")
        console.error(error);
      },
      complete: () => {

      }
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onFileSelected(event: any): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    this.selectedFile = file;

    if (!file) {
      return;
    }

    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        this.selectedFileErrorMsg = "Formato de arquivo inválido. Por favor, selecione um arquivo JPEG, JPG ou PNG."
        return;
      }

      const maxSize = 4 * 1024 * 1024;
      if (file.size > maxSize) {
        this.selectedFileErrorMsg = "Tamanho do arquivo excede 4 MB. Por favor, selecione um arquivo menor."
        return;
      }

      this.selectedFileName = file.name;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedFileUrl = e.target.result;
        this.selectedFileBlob = new Blob([file], { type: file.type });
      };
      reader.readAsDataURL(file);
      this.selectedFileErrorMsg = ""
    }
  }


}
