import { IsDefined, IsUUID } from 'class-validator';

export class InputAnalystIdDto {
  @IsUUID()
  @IsDefined()
  id: string;
}
