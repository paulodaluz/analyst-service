import { IsString, IsUUID } from 'class-validator';

export class CreateAnalystReponse {
  @IsUUID()
  @IsString()
  uuid: string;
}
