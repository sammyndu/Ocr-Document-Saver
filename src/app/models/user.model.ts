import { Role } from "./role.enum";

export class User {
    id: number;
    username: string;
    role: Role;
    isBlocked: boolean;
    dateCreated: Date;
    dateUpdated: Date;
}