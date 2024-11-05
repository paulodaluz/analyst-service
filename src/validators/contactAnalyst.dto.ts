import { IsString } from 'class-validator';

export class ContactDataDto {
  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsString()
  contactPreference: 'email' | 'phone';
}
