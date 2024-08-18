import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee, SaveEmployeeRequest } from '../model/Employee';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { ToastrService } from 'ngx-toastr';
import { Farm } from 'src/app/farm/model/Farm';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  employeeForm!: FormGroup;

  isEdit: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EmployeeFormComponent>, 
    @Inject(MAT_DIALOG_DATA) public employeeData: Employee, 
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private toastService: ToastrService
  ) {
    this.isEdit = this.employeeData !== null ? true : false;
    this.employeeForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    if(this.isEdit) {
      this.employeeForm.setValue({
        name: this.employeeData.name,
        lastName: this.employeeData.lastName,
        role: this.employeeData.role,
        salary: this.employeeData.salary,
        birthDate: this.employeeData.birthDate,
      });
    }
  }

  onSubmit() {
    const formValues = this.employeeForm.value
    const farmId = localStorage.getItem("farmId")!;
    if(this.isEdit) {
      const employeeId = this.employeeData.id!;
      const body = new Employee(
        this.employeeData.id, 
        formValues.name,
        formValues.lastName,
        formValues.birthDate,
        formValues.role,
        formValues.salary,
        new Farm(farmId)
      );
      this.employeeService.updateEmployee(employeeId, body).subscribe({
        next: (value) => {
          this.toastService.success("FUNCIONÁRIO EDITADO COM SUCESSO!");
          this.dialogRef.close("success");
        },
        error: (error) => {
          console.error(error);
          this.toastService.error("ERRO AO EDITAR FUNCIONÁRIO!");
        },
        complete: () => {
        }
      });
    } else {
      const body = new SaveEmployeeRequest(
        formValues.name,
        formValues.lastName,
        formValues.birthDate,
        formValues.role,
        formValues.salary,
        farmId
      );
      this.employeeService.saveEmployee(body).subscribe({
        next: (value) => {
          this.toastService.success("FUNCIONÁRIO SALVO COM SUCESSO!");
          this.dialogRef.close("success");
        },
        error: (error) => {
          console.error(error);
          this.toastService.error("ERRO AO SALVAR FUNCIONÁRIO!");
        },
        complete: () => {
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

}
