import { IsString, Length, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @Length(3, 255)
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
