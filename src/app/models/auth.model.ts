import { Role } from "./role.enum";
import { User } from "./user.model";

export class Auth {
    username: string;
    password: string;
}

export class Register extends Auth {
    role: number;
}

export class AuthResponse {
    user: User;
    token: string;
}