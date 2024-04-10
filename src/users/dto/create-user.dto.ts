import { IsEmail, IsEnum, IsString, IsUUID } from "class-validator";
import { UserRole } from "../enum/role.enum";
import { Roles } from "@prisma/client"


export class CreateUserDto {
    @IsUUID("4")
    public id: string

    @IsString()
    public name: string

    @IsString()
    public lastname: string

    @IsEmail()
    public email: string

    @IsEnum(UserRole, {
        message: `Valid roles are ${UserRole}`
    })
    public role: Roles
}
