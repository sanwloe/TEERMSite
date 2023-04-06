import { Role } from "./role";

export class User
{
    id!: string;
    fullName!: string;
    academicDegree!: string;
    academicRank!: string;
    workPlace!: string;
    jobTitle!: string;
    phone!: string;
    email!: string;
    password!:string;
    titleReport!: string;
    section!: string;
    payInfo!: string;
    role!: Role;
    roleId! : number;
    token!: string;
    tenantId!: number;
    tenant!: number;

    
}