import { Type } from 'class-transformer';
import {
  IsString,
  IsObject,
  IsDefined,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';
import { ContactDataDto } from './contactAnalyst.dto';
import { AddressDto } from './adressAnalyst.dto';

export class CreateAnalystDto {
  @IsString()
  fullname: string;

  @IsString()
  birthDay: string;

  @IsString()
  documentNumber: string;

  @IsString()
  gender: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => AddressDto)
  adress: AddressDto;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => ContactDataDto)
  contactPreference: AddressDto;
}
