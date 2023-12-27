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

  breeds = ["Poodle", "Labrador", "Golden", "Shih Tzu", "Siamese"];

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

  removeNonNumericCharacteres(event: Event): void {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;
    const numericValue = inputValue.replace(/[^0-9.,]/g, '');
    input.value = numericValue;
  }

}
