import {
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AddressDto } from 'src/validators/adressAnalyst.dto';
import { Type } from 'class-transformer';
import { ContactDataDto } from 'src/validators/contactAnalyst.dto';

export class AnalystEntity {
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
  contactPreference: AddressDto;
}
