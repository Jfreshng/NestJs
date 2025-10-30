import { IsEmail, IsNotEmpty, MinLength, ValidateIf } from "class-validator";

export class CreateUserDto {
    // userId: string;

    @IsNotEmpty()
    @MinLength(3)
    username: string;

    @ValidateIf(o => o.userFirstName !== null && o.userFirstName !== undefined && o.userFirstName !== '')
    @MinLength(3, { message: 'userFirstName must be at least 3 characters long' })
    userFirstName: string;
    
    @ValidateIf(o => o.userLastName !== null && o.userLastName !== undefined && o.userLastName !== '')
    @MinLength(3, { message: 'userLastName must be at least 3 characters long' })
    userLastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(7)
    password: string;

    createdDate: Date;
}