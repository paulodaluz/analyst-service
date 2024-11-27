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
  @IsDefined()
  @IsString()
  fullname: string;

  @IsDefined()
  @IsString()
  birthDay: string;

  @IsDefined()
  @IsString()
  documentNumber: string;

  @IsDefined()
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
  contact: ContactDataDto;
}
