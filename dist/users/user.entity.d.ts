import { Role } from '../common/enums/role.enum';
export declare class User {
    id: number;
    email: string;
    passwordHash: string;
    name: string;
    role: Role;
    createdAt: Date;
}
