import { Farm } from "src/app/farm/model/Farm";

export class Employee {
    constructor(
        public id: string | null = null,
        public name: string | null = null,
        public lastName: string | null = null,
        public birthDate: string | null = null,
        public role: string | null = null,
        public salary: number | null = null,
        public farm: Farm | null = null
    ) {}
}

export class PagedEmployees {
    constructor(
        public content: FindAllEmployeesResponse[],
        public totalPages: number,
        public totalElements: number,
        public pageSize: number,
        public pageNumber: number
    ) {}
}

export class FindAllEmployeesResponse {
    constructor(
        public id: string | null = null,
        public name: string | null = null,
        public lastName: string | null = null,
        public birthDate: string | null = null,
        public role: string | null = null,
        public salary: number | null = null
    ) {}
}

export class SaveEmployeeRequest {
    constructor(
        public name: string,
        public lastName: string,
        public birthDate: string,
        public role: string,
        public salary: number,
        public farmId: string
    ) {}
}

export class UpdateEmployeeRequest {
    constructor(
        public name: string | null = null,
        public lastName: string | null = null,
        public birthDate: string | null = null,
        public role: string | null = null,
        public salary: number | null = null
    ) {}
}