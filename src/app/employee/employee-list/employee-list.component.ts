import { Component, OnInit } from '@angular/core';
import { Employee, FindAllEmployeesResponse } from '../model/Employee';
import { EmployeeService } from '../employee.service';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogData } from 'src/app/components/confirmation-dialog/ConfirmationDialogData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employees: FindAllEmployeesResponse[] = [];

  displayedColumns: string[] = ['name', 'role', 'salary', 'birthDate', 'actions'];

  pageIndex = 0;
  pageSize = 10;
  totalPages = 0;
  length = 0;

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private toastService: ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loadEmployees();
  }
  
  loadEmployees(pageNumber: number = 0, pageSize: number = 10) {
    const farmId = localStorage.getItem("farmId")!;
    this.employeeService.findAllEmployees(farmId, pageNumber, pageSize).subscribe({
      next: (employeePage) => {
        this.employees = employeePage.content;
        this.pageIndex = pageNumber;
        this.pageSize = pageSize;
        this.totalPages = employeePage.totalPages;
        this.length = employeePage.totalElements;
      },
      error: (error) => {
        console.error(error);
        this.toastService.error("ERRO AO LISTAR FUNCIONÁRIOS!");
      },
      complete: () => {
  
      }
    });
  }

  openNewEmployeeDialog() {
    const dialogConfigs = { 
      autoFocus: false, 
      disableClose: true, 
      position: { 
        top: '10vh' 
      }, 
      width:'80vw',
      data: null
    }
    let dialogRef = this.dialog.open(EmployeeFormComponent, dialogConfigs);
    dialogRef.afterClosed().subscribe( result => {
      if(result === "success") {
        this.loadEmployees(this.pageIndex, this.pageSize);
      }
    });
  }

  openEditEmployeeDialog(employee: any) {
    const dialogConfigs = { 
      autoFocus: false, 
      disableClose: true, 
      position: { 
        top: '10vh' 
      }, 
      width:'80vw',
      data: employee
    }
    let dialogRef = this.dialog.open(EmployeeFormComponent, dialogConfigs);
    dialogRef.afterClosed().subscribe( result => {
      if(result === "success") {
        this.loadEmployees(this.pageIndex, this.pageSize);
      }
    });
  }

  openConfirmationDialog(employeeId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        text: 'Tem certeza de que deseja excluir o funcionário?',
        onConfirm: () => {
          this.employeeService.deleteEmployeeById(employeeId).subscribe({
            next: (value) => {
              this.toastService.success("FUNCIONÁRIO EXCLUÍDO COM SUCESSO!");
            },
            error: (error) => {
              console.error(error);
              this.toastService.error("ERRO AO EXCLUIR FUNCIONÁRIO!");
            },
            complete: () => {
              this.loadEmployees(this.pageIndex, this.pageSize);
            }
          });
        },
        onCancel: () => {
          dialogRef.close();
        }
      } as ConfirmationDialogData
    });
  }

  redirectToTasks(employee: Employee) {
    this.router.navigate(['/tasks'], { state: {employee: employee} })
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadEmployees(this.pageIndex, this.pageSize);
  }

}
