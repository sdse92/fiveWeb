export class Course {
    id?: string;
    name!: string;
    description!: string
    filesDirectory!: string;
    courseAdministratorId!: string;
    members!: string[];
    fileIds!: string[];
}