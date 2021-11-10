import { Role } from "./role";

export class FullUser {
    id!: number;
    username!: string;
    email!: string;
    roles: Role[] = [];
    firstName!: string;
    lastName!: string;
    status!: string;
    code!: string;
    newPassword!: string;
    confirmNewPassword!: string;
    isSelected!: boolean;
}
