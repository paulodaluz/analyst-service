import { Type } from 'class-transformer';
import {
  IsString,
  IsObject,
  IsDefined,
  IsNotEmptyObject,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { ContactDataDto } from './contactAnalyst.dto';
import { AddressDto } from './adressAnalyst.dto';

export class UpdateAnalystAnalystDto {
  @IsOptional()
  @IsDefined()
  @IsString()
  fullname: string;

  @IsOptional()
  @IsDefined()
  @IsString()
  birthDay: string;

  @IsOptional()
  @IsDefined()
  @IsString()
  documentNumber: string;

  @IsOptional()
  @IsDefined()
  @IsString()
  gender: string;

  @IsOptional()
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => AddressDto)
  adress: AddressDto;

  @IsOptional()
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => ContactDataDto)
  contact: ContactDataDto;
}
