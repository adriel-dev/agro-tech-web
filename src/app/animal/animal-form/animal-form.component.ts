import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Animal } from '../model/Animal';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.scss']
})
export class AnimalFormComponent implements OnInit {

  breeds = ["Poodle", "Labrador", "Golden", "Shih Tzu", "Siamês"];

  isEdit = false

  animalForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<AnimalFormComponent>, @Inject(MAT_DIALOG_DATA) public animal: Animal, private formBuilder: FormBuilder){
    this.isEdit = animal !== null ? true : false
    this.animalForm = this.formBuilder.group({
      name: new FormControl(),
      sex: new FormControl('', Validators.required),
      acquisitionDate: new FormControl({value: '', disabled: true}),
      saleDate: new FormControl({value: '', disabled: true}),
      acquisitionValue: new FormControl(0, Validators.required),
      saleValue: new FormControl(0, Validators.required),
      breed: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    if(this.isEdit) {
      this.animalForm.setValue({
        name: this.animal.name,
        sex: this.animal.sex,
        acquisitionDate: this.animal.acquisitionDate,
        saleDate: this.animal.saleDate,
        acquisitionValue: this.animal.acquisitionValue,
        saleValue: this.animal.saleValue,
        breed: this.animal.breed.name
      });
    }
  }

  onSubmit() {
    console.log("Is form valid? ");
    console.log(this.animalForm.valid);
  }

  onCancel() {
    this.dialogRef.close();
  }

  selectedFileName: string = '';
  selectedFileUrl: string | ArrayBuffer | null = null;
  selectedFileErrorMsg: string = "";

  onFileSelected(event: any): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0]; // obtém o primeiro arquivo selecionado

    if (file) {
      // Verifica o tipo do arquivo (aceita apenas JPEG, JPG ou PNG)
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        this.selectedFileErrorMsg = "Formato de arquivo inválido. Por favor, selecione um arquivo JPEG, JPG ou PNG."
        return;
      }

      // Verifica o tamanho do arquivo (por exemplo, limitando a 1 MB)
      const maxSize = 4096 * 1024; // 1 MB em bytes
      if (file.size > maxSize) {
        this.selectedFileErrorMsg = "Tamanho do arquivo excede 4 MB. Por favor, selecione um arquivo menor."
        return;
      }

      // Armazena o nome do arquivo para exibir no HTML
      this.selectedFileName = file.name;

      // Converte o arquivo em uma URL para exibir a imagem
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedFileUrl = e.target.result;
      };
      reader.readAsDataURL(file);
      this.selectedFileErrorMsg = ""
    }
  }


}
