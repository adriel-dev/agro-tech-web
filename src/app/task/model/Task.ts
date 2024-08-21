import { Employee } from "src/app/employee/model/Employee";

export class Task {
    constructor(
        public id: string,
        public title: string | null = null,
        public description: string | null = null,
        public status: TaskStatus = TaskStatus.TO_DO,
        public employee: Employee | null = null,
        public startDate: Date | null = null,
        public startedAt: Date | null = null,
        public finishUntil: Date | null = null,
        public finishedAt: Date | null = null,
        public createdDate: Date | null = null,
        public createdBy: string | null = null,
        public lastModifiedBy: string | null = null,
        public lastModifiedDate: Date | null = null,
        public isDeleted: boolean = false
    ) {}
}

export enum TaskStatus {
    TO_DO = "TO_DO",
    DOING = "DOING",
    DONE = "DONE"
}

export class CreateTaskRequest {
    constructor(
        public title: string | null = null,
        public description: string | null = null,
        public employeeId: string | null = null,
        public startDate: Date | null = null,
        public finishUntil: Date | null = null
    ) {}
}

export class UpdateTaskRequest {
    constructor(
        public title: string | null = null,
        public description: string | null = null,
        public startDate: Date | null = null,
        public finishUntil: Date | null = null
    ) {}
}
