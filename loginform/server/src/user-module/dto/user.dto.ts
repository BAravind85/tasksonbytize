import { IsEmail, IsDefined, IsString, MinLength, MaxLength, Matches, } from "class-validator";

export class CreateUserDTO {
    @IsEmail()
    @IsDefined()
    readonly email:string;
    

    @IsString()
    @MinLength(4)
    @MaxLength(12)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    readonly password: string;  

}