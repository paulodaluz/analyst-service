import {
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { AddressDto } from '../validators/adressAnalyst.dto';
import { Type } from 'class-transformer';
import { ContactDataDto } from '../validators/contactAnalyst.dto';

export class AnalystEntity {
  @IsUUID()
  @IsString()
  _id: string;

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
