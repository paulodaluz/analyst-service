import { IsString, IsNumber } from 'class-validator';

export class AddressDto {
  @IsString()
  street: string;

  @IsNumber()
  number: number;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  postalCode: string;
}
