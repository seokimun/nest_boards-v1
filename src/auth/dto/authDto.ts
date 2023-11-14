import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export namespace AuthDTO {
  export class SignUp {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @Length(4, 20)
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    nickname: string;
  }

  export class SignIn {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @Length(4, 20)
    @IsNotEmpty()
    password: string;
  }
}
