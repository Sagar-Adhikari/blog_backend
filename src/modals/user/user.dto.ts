import { IUser } from './user.interface';
import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsString } from 'class-validator';

export class RegisterUserDTO implements Partial<IUser> {
  @ApiProperty() @IsString() readonly firstName!: string;
  @ApiProperty() @IsString() readonly lastName!: string;
  @ApiProperty({ default: 'test@example.com', example: 'test@example.com' })
  @IsString()
  @IsEmail()
  readonly email!: string;
  @ApiProperty()
  @IsString()
  readonly password!: string;
}

export class LoginUserDTO implements Partial<IUser> {
  @ApiProperty({ default: 'test@example.com', example: 'test@example.com' })
  @IsString()
  readonly email!: string;
  @ApiProperty() @IsString() readonly password!: string;
}
